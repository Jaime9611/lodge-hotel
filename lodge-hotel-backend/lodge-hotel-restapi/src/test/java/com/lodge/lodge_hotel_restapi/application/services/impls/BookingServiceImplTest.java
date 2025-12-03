package com.lodge.lodge_hotel_restapi.application.services.impls;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.lodge.lodge_hotel_restapi.application.ports.booking.CreateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.DeleteBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.ReadBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.UpdateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.cabin.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.guest.CreateGuestPort;
import com.lodge.lodge_hotel_restapi.application.services.BookingService;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.BookingStatus;
import com.lodge.lodge_hotel_restapi.factories.BookingFactory;
import com.lodge.lodge_hotel_restapi.factories.CabinFactory;
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
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

class BookingServiceImplTest {

  @Mock
  ReadBookingPort readPort;

  @Mock
  CreateBookingPort createPort;

  @Mock
  DeleteBookingPort deletePort;

  @Mock
  UpdateBookingPort updatePort;

  @Mock
  ReadCabinPort readCabinPort;

  @Mock
  CreateGuestPort createGuestPort;

  @Mock
  PageMapper pageMapper;

  @Mock
  HttpServletRequest httpServletRequest;

  @Captor
  ArgumentCaptor<Long> idArgumentCaptor;

  @Captor
  ArgumentCaptor<Booking> bookingArgumentCaptor;

  BookingService service;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    service = new BookingServiceImpl(readPort, createPort, deletePort, updatePort, readCabinPort,
        createGuestPort, pageMapper, httpServletRequest);
  }

  @Test
  void testBookingQuotation() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();
    testBooking.getCabins().get(0).setDiscount(BigDecimal.ZERO);

    int daysBetween = 3;
    LocalDateTime testingEndDate = LocalDateTime.now();
    LocalDateTime testingStartDate = testingEndDate.minusDays(daysBetween);

    given(readCabinPort.get(anyLong())).willReturn(
        Optional.ofNullable(CabinFactory.createSingleCabin()));

    BookingQuotationDto dto = BookingQuotationDto.builder().cabins(testBooking.getCabins().stream()
        .map(cabin -> CabinFactory.createSingleCabinSimpleDto())
        .toList()).startDate(testingStartDate).endDate(testingEndDate).build();

    // Act
    BigDecimal amount = service.getBookingQuotation(dto);

    // Assert
    BigDecimal total = BigDecimal.valueOf(CabinFactory.PRICE)
        .multiply(BigDecimal.valueOf(daysBetween));
    assertThat(amount).isEqualTo(total);
  }

  @Test
  public void testBookingQuotationCabinNotFound() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    int daysBetween = 3;
    LocalDateTime testingEndDate = LocalDateTime.now();
    LocalDateTime testingStartDate = testingEndDate.minusDays(daysBetween);

    given(readCabinPort.get(anyLong())).willReturn(
        Optional.empty());

    BookingQuotationDto dto = BookingQuotationDto.builder().cabins(testBooking.getCabins().stream()
        .map(cabin -> CabinFactory.createSingleCabinSimpleDto())
        .toList()).startDate(testingStartDate).endDate(testingEndDate).build();

    ItemNotFoundException exception = assertThrows(ItemNotFoundException.class, () -> {
      // Act
      BigDecimal amount = service.getBookingQuotation(dto);
    });

    assertEquals("Cabin with provide ID: " + CabinFactory.TEST_ID + " not found.",
        exception.getMessage());
  }

  @Test
  void testUpdateBooking() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();
    given(readPort.get(testBooking.getId())).willReturn(Optional.ofNullable(Booking.builder().id(
        testBooking.getId()).build()));

    // Act
    service.update(testBooking.getId(), testBooking);

    // Assert
    verify(readPort, times(1)).get(testBooking.getId());
    verify(updatePort).update(bookingArgumentCaptor.capture());

    assertThat(bookingArgumentCaptor.getValue().getId()).isEqualTo(testBooking.getId());
    assertThat(bookingArgumentCaptor.getValue().isPaid()).isEqualTo(testBooking.isPaid());
    assertThat(bookingArgumentCaptor.getValue().getStatus()).isEqualTo(testBooking.getStatus());
  }

  @Test
  void testUpdateBookingNotFound() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();
    given(readPort.get(testBooking.getId())).willReturn(Optional.empty());

    // Act
    ItemNotFoundException exception = assertThrows(ItemNotFoundException.class, () -> {
      // Act
      service.update(testBooking.getId(), testBooking);
    });

    // Assert
    assertEquals("Booking with provided ID not found.",
        exception.getMessage());
  }

  @Test
  void testDeleteBooking() {
    // Arrange
    given(readPort.get(anyLong())).willReturn(
        Optional.ofNullable(Booking.builder().id(BookingFactory.TEST_ID).build()));

    // Act
    service.delete(BookingFactory.TEST_ID);

    // Assert
    verify(readPort, times(1)).get(anyLong());
    verify(deletePort).delete(idArgumentCaptor.capture());
    assertThat(idArgumentCaptor.getValue()).isEqualTo(BookingFactory.TEST_ID);
  }

  @Test
  void testDeleteBookingNotFound() {
    // Arrange
    given(readPort.get(anyLong())).willReturn(
        Optional.empty());

    // Act
    ItemNotFoundException exception = assertThrows(ItemNotFoundException.class, () -> {
      service.delete(BookingFactory.TEST_ID);
    });

    // Assert
    assertEquals("Booking with provided ID not found.",
        exception.getMessage());
  }

  @Test
  void testGetBookingListNoStatus() {
    // Arrange
    List<Booking> testBookingList = BookingFactory.createBookingList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<Booking> testPage = new PageImpl<>(testBookingList, pageable, totalElements);
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(readPort.getAll(any(PageRequest.class))).willReturn(testPage);
    given(pageMapper.pagetoPageResponse(any(Page.class))).willReturn(
        pageResponse.content(testBookingList).build());

    // Act
    PageResponse<Booking> foundCabins = service.getAll(null, "id", "asc", 1, 5);

    // Assert
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(0).isPaid()).isEqualTo(testBookingList.get(0).isPaid());
    assertThat(foundCabins.getContent().get(0).getStatus()).isEqualTo(
        testBookingList.get(0).getStatus());
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(1).getId()).isEqualTo(testBookingList.get(1).getId());
    assertThat(foundCabins.getContent().get(1).isPaid()).isEqualTo(testBookingList.get(1).isPaid());
    assertThat(foundCabins.getContent().get(1).getStatus()).isEqualTo(
        testBookingList.get(1).getStatus());
  }

  @Test
  void testGetBookingListWithStatus() {
    // Arrange
    List<Booking> testBookingList = BookingFactory.createBookingList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<Booking> testPage = new PageImpl<>(testBookingList, pageable, totalElements);
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(readPort.getAllByStatus(any(BookingStatus.class), any(PageRequest.class))).willReturn(
        testPage);
    given(pageMapper.pagetoPageResponse(any(Page.class))).willReturn(
        pageResponse.content(testBookingList).build());

    // Act
    PageResponse<Booking> foundCabins = service.getAll(BookingStatus.UNCONFIRMED, "id", "asc", 1,
        5);

    // Assert
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(0).isPaid()).isEqualTo(testBookingList.get(0).isPaid());
    assertThat(foundCabins.getContent().get(0).getStatus()).isEqualTo(
        testBookingList.get(0).getStatus());
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(1).getId()).isEqualTo(testBookingList.get(1).getId());
    assertThat(foundCabins.getContent().get(1).isPaid()).isEqualTo(testBookingList.get(1).isPaid());
    assertThat(foundCabins.getContent().get(1).getStatus()).isEqualTo(
        testBookingList.get(1).getStatus());
  }

  @Test
  void testGetBookingsAfterDate() {
    // Arrange
    List<Booking> testBookingList = BookingFactory.createBookingList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<Booking> testPage = new PageImpl<>(testBookingList, pageable, totalElements);
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(readPort.getAfterDate(any(LocalDate.class), any(LocalDate.class),
        any(PageRequest.class))).willReturn(testPage);
    given(pageMapper.pagetoPageResponse(any(Page.class))).willReturn(
        pageResponse.content(testBookingList).build());

    // Act
    PageResponse<Booking> foundCabins = service.getAllAfterDate(true, LocalDate.now().plusDays(1L),
        1, 600);

    // Assert
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(0).isPaid()).isEqualTo(testBookingList.get(0).isPaid());
    assertThat(foundCabins.getContent().get(0).getStatus()).isEqualTo(
        testBookingList.get(0).getStatus());
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(1).getId()).isEqualTo(testBookingList.get(1).getId());
    assertThat(foundCabins.getContent().get(1).isPaid()).isEqualTo(testBookingList.get(1).isPaid());
    assertThat(foundCabins.getContent().get(1).getStatus()).isEqualTo(
        testBookingList.get(1).getStatus());
  }

  @Test
  void testGetBookingsGetStaysAfterDate() {
    // Arrange
    List<Booking> testBookingList = BookingFactory.createBookingList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<Booking> testPage = new PageImpl<>(testBookingList, pageable, totalElements);
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(readPort.getStaysAfterDate(any(LocalDate.class), any(PageRequest.class))).willReturn(
        testPage);
    given(pageMapper.pagetoPageResponse(any(Page.class))).willReturn(
        pageResponse.content(testBookingList).build());

    // Act
    PageResponse<Booking> foundCabins = service.getAllAfterDate(false, LocalDate.now().plusDays(1L),
        1, 5);

    // Assert
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(0).isPaid()).isEqualTo(testBookingList.get(0).isPaid());
    assertThat(foundCabins.getContent().get(0).getStatus()).isEqualTo(
        testBookingList.get(0).getStatus());
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(1).getId()).isEqualTo(testBookingList.get(1).getId());
    assertThat(foundCabins.getContent().get(1).isPaid()).isEqualTo(testBookingList.get(1).isPaid());
    assertThat(foundCabins.getContent().get(1).getStatus()).isEqualTo(
        testBookingList.get(1).getStatus());
  }

  @Test
  void testGetTodayBookingActivity() {
    // Arrange
    List<Booking> testBookingList = BookingFactory.createBookingList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<Booking> testPage = new PageImpl<>(testBookingList, pageable, totalElements);
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(readPort.getTodayActivity(any(PageRequest.class))).willReturn(testPage);
    given(pageMapper.pagetoPageResponse(any(Page.class))).willReturn(
        pageResponse.content(testBookingList).build());

    // Act
    PageResponse<Booking> foundCabins = service.getTodaysActivity(null, null);

    // Assert
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(0).isPaid()).isEqualTo(testBookingList.get(0).isPaid());
    assertThat(foundCabins.getContent().get(0).getStatus()).isEqualTo(
        testBookingList.get(0).getStatus());
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.getContent().get(1).getId()).isEqualTo(testBookingList.get(1).getId());
    assertThat(foundCabins.getContent().get(1).isPaid()).isEqualTo(testBookingList.get(1).isPaid());
    assertThat(foundCabins.getContent().get(1).getStatus()).isEqualTo(
        testBookingList.get(1).getStatus());
  }

  @Test
  void testGetBookedReservations() {
    // Arrange
    List<Booking> testBookingList = BookingFactory.createBookingList(2);

    given(readPort.getBookedReservations(anyLong())).willReturn(testBookingList);

    // Act
    List<Booking> foundCabins = service.getBookedReservations(1L);

    // Assert
    assertThat(foundCabins.get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.get(0).isPaid()).isEqualTo(testBookingList.get(0).isPaid());
    assertThat(foundCabins.get(0).getStatus()).isEqualTo(
        testBookingList.get(0).getStatus());
    assertThat(foundCabins.get(0).getId()).isEqualTo(testBookingList.get(0).getId());
    assertThat(foundCabins.get(1).getId()).isEqualTo(testBookingList.get(1).getId());
    assertThat(foundCabins.get(1).isPaid()).isEqualTo(testBookingList.get(1).isPaid());
    assertThat(foundCabins.get(1).getStatus()).isEqualTo(
        testBookingList.get(1).getStatus());
  }

  @Test
  void testGetBooking() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    given(readPort.get(testBooking.getId())).willReturn(Optional.of(testBooking));

    // Act
    Booking foundBooking = service.get(testBooking.getId());

    // Assert
    assertThat(foundBooking.getId()).isEqualTo(testBooking.getId());
    assertThat(foundBooking.isPaid()).isEqualTo(testBooking.isPaid());
  }

  @Test
  void testGetBookingNotFound() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    given(readPort.get(testBooking.getId())).willReturn(Optional.empty());

    // Act
    ItemNotFoundException exception = assertThrows(ItemNotFoundException.class, () -> {
      Booking foundBooking = service.get(testBooking.getId());
    });

    // Assert
    assertEquals("Booking with provided ID not found.",
        exception.getMessage());
  }

  @Test
  void testSaveBooking() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    given(createPort.save(any(Booking.class))).willReturn(
        Booking.builder().id(testBooking.getId()).build());

    given(readCabinPort.get(anyLong())).willReturn(
        Optional.ofNullable(testBooking.getCabins().get(0)));

    BookingSimpleDto dto = BookingSimpleDto.builder().cabins(testBooking.getCabins().stream()
        .map(cabin -> CabinSimpleDto.builder().name(cabin.getName()).id(cabin.getId()).build())
        .toList()).build();

    // Act
    Long savedBookingId = service.save(dto);

    // Assert
    verify(createPort, times(1)).save(any(Booking.class));

    assertThat(savedBookingId).isEqualTo(testBooking.getId());
  }

  @Test
  void testSaveBookingCabinNotFound() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();
    BookingSimpleDto.BookingSimpleDtoBuilder testDto = BookingSimpleDto.builder();

    CabinSimpleDto.CabinSimpleDtoBuilder cabinDto = CabinSimpleDto.builder();
    cabinDto.id(testBooking.getCabins().get(0).getId());
    cabinDto.name(testBooking.getCabins().get(0).getName());

    testDto.id(testBooking.getId());
    testDto.cabins(Collections.singletonList(cabinDto.build()));


    given(readCabinPort.get(anyLong())).willReturn(
        Optional.empty());

    // Act
    ItemNotFoundException exception = assertThrows(ItemNotFoundException.class, () -> {
      Long savedBooking = service.save(testDto.build());
    });

    // Assert
    assertEquals("Cabin with provided ID: " + testBooking.getCabins().get(0).getId() + " not found.",
        exception.getMessage());
  }

  @Test
  void testUpdateBookingStatus() {

    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    given(readPort.get(testBooking.getId())).willReturn(Optional.of(testBooking));

    // Act
    service.updateBookingStatus(BookingFactory.TEST_ID, BookingStatus.CHECKED_OUT);

    // Assert
    verify(readPort, times(1)).get(idArgumentCaptor.capture());
    verify(updatePort).update(bookingArgumentCaptor.capture());
    assertThat(idArgumentCaptor.getValue()).isEqualTo(BookingFactory.TEST_ID);
    assertThat(bookingArgumentCaptor.getValue().getStatus()).isEqualTo(BookingStatus.CHECKED_OUT);
  }
}