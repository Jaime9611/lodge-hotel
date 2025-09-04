package com.lodge.lodge_hotel_restapi.application.services.impls;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.lodge.lodge_hotel_restapi.application.ports.CreateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.DeleteBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.UpdateBookingPort;
import com.lodge.lodge_hotel_restapi.application.services.BookingService;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.factories.BookingFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
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
  PageMapper pageMapper;

  @Captor
  ArgumentCaptor<Long> idArgumentCaptor;

  @Captor
  ArgumentCaptor<Booking> bookingArgumentCaptor;

  BookingService service;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    service = new BookingServiceImpl(readPort, createPort, deletePort, updatePort, pageMapper);
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
    assertThat(bookingArgumentCaptor.getValue().isHasBreakfast()).isEqualTo(
        testBooking.isHasBreakfast());
    assertThat(bookingArgumentCaptor.getValue().getStatus()).isEqualTo(testBooking.getStatus());
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
    PageResponse<Booking> foundCabins = service.getAll("test", 1, 5);

    // Assert
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testCabinList.get(0).getId());
    assertThat(foundCabins.getContent().get(0).isPaid()).isEqualTo(testCabinList.get(0).isPaid());
    assertThat(foundCabins.getContent().get(0).isHasBreakfast()).isEqualTo(
        testCabinList.get(0).isHasBreakfast());
    assertThat(foundCabins.getContent().get(0).getStatus()).isEqualTo(
        testCabinList.get(0).getStatus());
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testCabinList.get(0).getId());
    assertThat(foundCabins.getContent().get(1).getId()).isEqualTo(testCabinList.get(1).getId());
    assertThat(foundCabins.getContent().get(1).isPaid()).isEqualTo(testCabinList.get(1).isPaid());
    assertThat(foundCabins.getContent().get(1).isHasBreakfast()).isEqualTo(
        testCabinList.get(1).isHasBreakfast());
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
    assertThat(foundBooking.isHasBreakfast()).isEqualTo(testBooking.isHasBreakfast());

  }

  @Test
  void testSaveBooking() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    given(createPort.save(any(Booking.class))).willReturn(
        Booking.builder().id(testBooking.getId()).build());

    // Act
    Long savedCabinId = service.save(testBooking);

    // Assert
    verify(createPort, times(1)).save(any(Booking.class));

    assertThat(savedCabinId).isEqualTo(testBooking.getId());
  }

}