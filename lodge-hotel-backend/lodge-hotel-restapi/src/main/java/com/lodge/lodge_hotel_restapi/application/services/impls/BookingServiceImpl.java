package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.ports.booking.CreateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.DeleteBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.ReadBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.UpdateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.cabin.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.guest.CreateGuestPort;
import com.lodge.lodge_hotel_restapi.application.services.BookingService;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.BookingStatus;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.domain.Guest;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingQuotationDto;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingSimpleDto;
import com.lodge.lodge_hotel_restapi.web.dtos.CabinSimpleDto;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import com.lodge.lodge_hotel_restapi.web.validations.exceptions.ItemNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

  private final ReadBookingPort readBookingPort;
  private final CreateBookingPort createBookingPort;
  private final DeleteBookingPort deleteBookingPort;
  private final UpdateBookingPort updateBookingPort;
  private final ReadCabinPort readCabinPort;
  private final CreateGuestPort createGuestPort;
  private final PageMapper pageMapper;
  private final HttpServletRequest httpServletRequest;

  private static final int DEFAULT_PAGE = 0;
  private static final int DEFAULT_PAGE_SIZE = 25;
  private static final int PAGE_MAX_SIZE = 500;

  @Override
  public BigDecimal getBookingQuotation(BookingQuotationDto booking) {
    log.debug("{} - getBookingQuotation was called.", BookingService.class.getSimpleName());

    return calculateTotal(booking.getCabins(), booking.getStartDate(), booking.getEndDate());
  }

  @Override
  public PageResponse<Booking> getAll(String cabinName, Integer pageNumber, Integer pageSize) {
    log.debug("{} - Get all bookings was called.", BookingService.class.getSimpleName());

    PageRequest pageRequest = buildPageRequest(pageNumber, pageSize);

    PageResponse<Booking> bookingPageResponse;

    Page<Booking> bookingPage = readBookingPort.getAll(pageRequest);
    bookingPageResponse = pageMapper.pagetoPageResponse(bookingPage);

    return bookingPageResponse;
  }

  @Override
  public PageResponse<Booking> getAllAfterDate(boolean fromCreation, LocalDate date,
      Integer pageNumber, Integer pageSize) {
    log.debug("{} - Get all bookings after date was called.", BookingService.class.getSimpleName());

    PageRequest pageRequest = buildPageRequest(pageNumber, pageSize);

    PageResponse<Booking> bookingPageResponse;

    LocalDate today = LocalDate.now();

    Page<Booking> bookingPage;

    if (fromCreation) {
      bookingPage = readBookingPort.getAfterDate(date, today, pageRequest);
    } else {
      bookingPage = readBookingPort.getStaysAfterDate(date, pageRequest);
    }

    bookingPageResponse = pageMapper.pagetoPageResponse(bookingPage);

    return bookingPageResponse;
  }

  @Override
  public PageResponse<Booking> getTodaysActivity(Integer pageNumber, Integer pageSize) {
    log.debug("{} - Get todays activity bookings was called.",
        BookingService.class.getSimpleName());

    PageRequest pageRequest = buildPageRequest(pageNumber, pageSize);

    PageResponse<Booking> bookingPageResponse;

    Page<Booking> bookingPage = readBookingPort.getTodaysActivity(pageRequest);
    bookingPageResponse = pageMapper.pagetoPageResponse(bookingPage);

    return bookingPageResponse;
  }

  @Override
  public Booking get(Long id) {
    log.debug("{} - Get by id was called with {}", BookingService.class.getSimpleName(),
        String.valueOf(id));

    return findByBookingId(id);
  }

  @Override
  public void delete(Long id) {
    log.debug("{} - Delete by id was called with {}", BookingService.class.getSimpleName(),
        String.valueOf(id));

    Booking foundBooking = findByBookingId(id);

    deleteBookingPort.delete(foundBooking.getId());
  }

  @Override
  public void update(Long id, Booking booking) {
    log.debug("{} - Update was called with {}", BookingService.class.getSimpleName(),
        id);

    Booking foundBooking = findByBookingId(id);

    foundBooking.setStartDate(booking.getStartDate());
    foundBooking.setEndDate(booking.getEndDate());
    foundBooking.setPaid(booking.isPaid());
    foundBooking.setStatus(booking.getStatus());

    updateBookingPort.update(foundBooking);
  }

  @Override
  public void updateBookingStatus(Long id, BookingStatus status) {
    log.debug("{} - Update Status was called with {}", BookingService.class.getSimpleName(),
        id);

    Booking foundBooking = findByBookingId(id);
    foundBooking.setStatus(status);

    updateBookingPort.update(foundBooking);
  }

  @Override
  public Long save(BookingSimpleDto booking) {
    log.debug("{} - Save was called", BookingService.class.getSimpleName());

    Booking newBooking = Booking.builder().build();
    newBooking.setStatus(BookingStatus.UNCONFIRMED);
    newBooking.setStartDate(booking.getStartDate());
    newBooking.setEndDate(booking.getEndDate());
    newBooking.setPaid(booking.isPaid());

    Guest savedGuest = createGuestPort.save(booking.getGuest());
    newBooking.setGuest(savedGuest);

    List<Cabin> foundCabins = new ArrayList<>();
    for (CabinSimpleDto cabin : booking.getCabins()) {
      Cabin foundCabin = readCabinPort.get(cabin.getId())
          .orElseThrow(() -> new ItemNotFoundException(
              "Cabin with provide ID" + cabin.getId() + " not found.",
              httpServletRequest.getRequestURI()));
      foundCabins.add(foundCabin);
    }
    newBooking.setCabins(foundCabins);

    Booking savedBooking = createBookingPort.save(newBooking);

    return savedBooking.getId();
  }

  private Booking findByBookingId(Long id) {
    log.debug("{} - FinById was called with {}", BookingService.class.getSimpleName(),
        id);

    return readBookingPort.get(id)
        .orElseThrow(() -> new ItemNotFoundException("Booking with provided ID not found."));
  }

  private BigDecimal calculateTotal(List<CabinSimpleDto> cabins, LocalDateTime startDate,
      LocalDateTime endDate) {
    BigDecimal total = BigDecimal.ZERO;
    long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);

    for (CabinSimpleDto cabin : cabins) {
      Cabin foundCabin = readCabinPort.get(cabin.getId())
          .orElseThrow(() -> new ItemNotFoundException(
              "Cabin with provide ID: " + cabin.getId() + " not found.",
              httpServletRequest.getRequestURI()));

      total = total.add(foundCabin.getRegularPrice());
    }

    return total.multiply(BigDecimal.valueOf(daysBetween));
  }

  private PageRequest buildPageRequest(Integer pageNumber, Integer pageSize) {
    int queryPageNumber;
    int queryPageSize;

    if (pageNumber != null && pageNumber > 0) {
      queryPageNumber = pageNumber - 1;
    } else {
      queryPageNumber = DEFAULT_PAGE;
    }

    if (pageSize == null) {
      queryPageSize = DEFAULT_PAGE_SIZE;
    } else {
      if (pageSize > 500) {
        queryPageSize = PAGE_MAX_SIZE;
      } else {
        queryPageSize = pageSize;
      }
    }

    Sort sort = Sort.by(Sort.Order.asc("id"));

    return PageRequest.of(queryPageNumber, queryPageSize, sort);
  }
}
