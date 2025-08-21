package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.ports.CreateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.DeleteBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.UpdateBookingPort;
import com.lodge.lodge_hotel_restapi.application.services.BookingService;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import com.lodge.lodge_hotel_restapi.web.validations.exceptions.ItemNotFoundException;
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
  private final PageMapper pageMapper;

  private static final int DEFAULT_PAGE = 0;
  private static final int DEFAULT_PAGE_SIZE = 25;
  private static final int PAGE_MAX_SIZE = 500;

  @Override
  public PageResponse<Booking> getAll(String cabinName, Integer pageNumber, Integer pageSize) {
    log.debug("{} - Get all bookings was called.", BookingService.class.getSimpleName());

    PageRequest pageRequest = buildPageRequest(pageNumber, pageSize);

    PageResponse<Booking> bookingPageResponse;

    Page<Booking> cabinPage = readBookingPort.getAll(pageRequest);
    bookingPageResponse = pageMapper.pagetoPageResponse(cabinPage);

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
  public Long save(Booking booking) {
    log.debug("{} - Save was called with {}", BookingService.class.getSimpleName(),
        booking.getCabin().getName());

    Booking savedCabin = createBookingPort.save(booking);

    return savedCabin.getId();
  }

  private Booking findByBookingId(Long id) {
    log.debug("{} - FinById was called with {}", BookingService.class.getSimpleName(),
        id);

    return readBookingPort.get(id)
        .orElseThrow(() -> new ItemNotFoundException("Booking with provided ID not found."));
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
