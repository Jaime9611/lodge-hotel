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
import java.time.LocalDateTime;
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

    int daysBetween = 3;
    LocalDateTime testingEndDate = LocalDateTime.now();
    LocalDateTime testingStartDate = testingEndDate.minusDays(daysBetween);

    given(readCabinPort.get(anyLong())).willReturn(
        Optional.ofNullable(CabinFactory.createSingleCabin()));

    BookingQuotationDto dto = BookingQuotationDto.builder().cabins(testBooking.getCabins().stream()
        .map(cabin -> CabinSimpleDto.builder().id(1L).build())
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
        .map(cabin -> CabinSimpleDto.builder().id(CabinFactory.TEST_ID).build())
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
  void testGetBookingList() {
    // Arrange
    List<Booking> testCabinList = BookingFactory.createBookingList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<Booking> testPage = new PageImpl<>(testCabinList, pageable, totalElements);
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(readPort.getAll(any(PageRequest.class))).willReturn(testPage);
    given(pageMapper.pagetoPageResponse(any(Page.class))).willReturn(
        pageResponse.content(testCabinList).build());

    // Act
    PageResponse<Booking> foundCabins = service.getAll(null, "id", "asc", 1, 5);

    // Assert
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testCabinList.get(0).getId());
    assertThat(foundCabins.getContent().get(0).isPaid()).isEqualTo(testCabinList.get(0).isPaid());
    assertThat(foundCabins.getContent().get(0).getStatus()).isEqualTo(
        testCabinList.get(0).getStatus());
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testCabinList.get(0).getId());
    assertThat(foundCabins.getContent().get(1).getId()).isEqualTo(testCabinList.get(1).getId());
    assertThat(foundCabins.getContent().get(1).isPaid()).isEqualTo(testCabinList.get(1).isPaid());
    assertThat(foundCabins.getContent().get(1).getStatus()).isEqualTo(
        testCabinList.get(1).getStatus());
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

}