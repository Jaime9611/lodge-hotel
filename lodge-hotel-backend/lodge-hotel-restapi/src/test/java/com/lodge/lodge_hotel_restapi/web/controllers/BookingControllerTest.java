package com.lodge.lodge_hotel_restapi.web.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lodge.lodge_hotel_restapi.application.ports.booking.CreateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.DeleteBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.ReadBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.UpdateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.cabin.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.guest.CreateGuestPort;
import com.lodge.lodge_hotel_restapi.application.services.BookingService;
import com.lodge.lodge_hotel_restapi.application.services.impls.BookingServiceImpl;
import com.lodge.lodge_hotel_restapi.config.KeyStoreConfig;
import com.lodge.lodge_hotel_restapi.config.SecurityConfig;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.BookingStatus;
import com.lodge.lodge_hotel_restapi.factories.BookingFactory;
import com.lodge.lodge_hotel_restapi.factories.CabinFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.utils.constants.UserConstants;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingQuotationDto;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingSimpleDto;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(BookingController.class)
@Import({SecurityConfig.class, KeyStoreConfig.class})
class BookingControllerTest {

  @Autowired
  MockMvc mockMvc;

  @Autowired
  ObjectMapper objectMapper;

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
  HttpServletRequest httpServletRequest;

  @Captor
  ArgumentCaptor<Long> idArgumentCaptor;

  @Captor
  ArgumentCaptor<Booking> bookingArgumentCaptor;

  @Captor
  ArgumentCaptor<BookingSimpleDto> bookingDtoArgumentCaptor;

  @Captor
  ArgumentCaptor<BookingQuotationDto> bookingQuotationDtoArgumentCaptor;

  @Captor
  ArgumentCaptor<BookingStatus> bookingStatusArgumentCaptor;

  @Mock
  PageMapper pageMapper;

  @MockitoBean
  BookingService bookingService;

  BookingServiceImpl bookingServiceImpl;

  @BeforeEach
  void setUp() {
    bookingServiceImpl = new BookingServiceImpl(readPort, createPort, deletePort, updatePort,
        readCabinPort,
        createGuestPort, pageMapper, httpServletRequest);
  }

  @Test
  @WithMockUser(username = "testuser", authorities = {UserConstants.ROLE_STAFF})
  void testGetBookings() throws Exception {
    // Arrange
    List<Booking> testBookings = BookingFactory.createBookingList(2);

    long totalElements = 2;
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(bookingService.getAll(BookingStatus.UNCONFIRMED, "id", "asc", null, null)).willReturn(
        pageResponse.content(testBookings).totalElements(totalElements).build());

    // Assert
    mockMvc.perform(
            get(Endpoints.BOOKING).accept(MediaType.APPLICATION_JSON).param("status", "UNCONFIRMED"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray())
        .andExpect(jsonPath("$.totalElements").value(2));
  }

  @Test
  @WithMockUser(username = "testuser", authorities = {UserConstants.ROLE_STAFF})
  void testGetBookingsAfterDate() throws Exception {
    // Arrange
    List<Booking> testBookings = BookingFactory.createBookingList(2);

    long totalElements = 2;
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(bookingService.getAllAfterDate(anyBoolean(), any(LocalDate.class), isNull(),
        isNull())).willReturn(
        pageResponse.content(testBookings).totalElements(totalElements).build());

    // Assert
    mockMvc.perform(
            get(Endpoints.BOOKING + Endpoints.BOOKING_AFTER)
                .param("fromCreation", "false")
                .param("date", LocalDate.now().toString())
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray())
        .andExpect(jsonPath("$.totalElements").value(2));
  }

  @Test
  @WithMockUser(username = "testuser", authorities = {UserConstants.ROLE_STAFF})
  void testGetTodayBookings() throws Exception {
    // Arrange
    List<Booking> testBookings = BookingFactory.createBookingList(2);

    long totalElements = 2;
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(bookingService.getTodaysActivity(isNull(), isNull())).willReturn(
        pageResponse.content(testBookings).totalElements(totalElements).build());

    // Assert
    mockMvc.perform(
            get(Endpoints.BOOKING + Endpoints.BOOKING_TODAY)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray())
        .andExpect(jsonPath("$.totalElements").value(2));
  }

  @Test
  @WithMockUser(username = "testuser", authorities = {UserConstants.ROLE_STAFF})
  void testGetBookedReservations() throws Exception {
    // Arrange
    List<Booking> testBookings = BookingFactory.createBookingList(2);

    given(bookingService.getBookedReservations(anyLong())).willReturn(
        testBookings);

    // Assert
    mockMvc.perform(
            get(Endpoints.BOOKING + Endpoints.BOOKING_RESERVATIONS, 1L)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray());
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {UserConstants.ROLE_STAFF})
  void testGetBookingById() throws Exception {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    given(bookingService.get(testBooking.getId())).willReturn(testBooking);

    // Assert
    mockMvc.perform(get(Endpoints.BOOKING + "/{id}", testBooking.getId())
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {UserConstants.ROLE_STAFF})
  void testGetBookingQuotation() throws Exception {
    // Arrange
    BookingQuotationDto bookingQuotation = BookingQuotationDto.builder()
        .cabins(CabinFactory.createCabinSimpleDtoList(2))
        .startDate(LocalDateTime.now())
        .endDate(LocalDateTime.now().plusDays(2L)).build();

    given(bookingService.getBookingQuotation(bookingQuotation)).willReturn(
        BigDecimal.valueOf(200));

    // Assert
    mockMvc.perform(post(Endpoints.BOOKING + Endpoints.BOOKING_QUOTATION)
            .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(bookingQuotation)))
        .andExpect(status().isOk());

    verify(bookingService, times(1)).getBookingQuotation(
        bookingQuotationDtoArgumentCaptor.capture());
    assertThat(bookingQuotationDtoArgumentCaptor.getValue().getCabins()).hasSize(2);

  }

  @Test
  @WithMockUser(username = "testUser", authorities = {UserConstants.ROLE_STAFF})
  void testUpdateBooking() throws Exception {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    // Assert
    mockMvc.perform(put(Endpoints.BOOKING + "/{id}", testBooking.getId())
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(testBooking)))
        .andExpect(status().isNoContent());

    verify(bookingService, times(1)).update(idArgumentCaptor.capture(),
        bookingArgumentCaptor.capture());
    assertThat(idArgumentCaptor.getValue()).isEqualTo(testBooking.getId());
    assertThat(bookingArgumentCaptor.getValue().getStatus()).isEqualTo(testBooking.getStatus());
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {UserConstants.ROLE_STAFF})
  void testUpdateBookingStatus() throws Exception {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    // Assert
    mockMvc.perform(patch(Endpoints.BOOKING + "/{id}", testBooking.getId())
            .accept(MediaType.APPLICATION_JSON)
            .param("status", BookingStatus.CHECKED_IN.toString()))
        .andExpect(status().isNoContent());

    verify(bookingService, times(1)).updateBookingStatus(idArgumentCaptor.capture(),
        bookingStatusArgumentCaptor.capture());
    assertThat(idArgumentCaptor.getValue()).isEqualTo(testBooking.getId());
    assertThat(bookingStatusArgumentCaptor.getValue()).isEqualTo(BookingStatus.CHECKED_IN);
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {UserConstants.ROLE_STAFF})
  void testSaveBooking() throws Exception {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    // Assert
    mockMvc.perform(post(Endpoints.BOOKING, testBooking.getId())
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(testBooking)))
        .andExpect(status().isCreated());

    verify(bookingService, times(1)).save(
        bookingDtoArgumentCaptor.capture());
    assertThat(bookingDtoArgumentCaptor.getValue().getStatus()).isEqualTo(testBooking.getStatus());
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {UserConstants.ROLE_STAFF})
  void testDeleteBooking() throws Exception {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    // Assert
    mockMvc.perform(delete(Endpoints.BOOKING + "/{id}", testBooking.getId()))
        .andExpect(status().isNoContent());

    verify(bookingService, times(1)).delete(idArgumentCaptor.capture());
    assertThat(idArgumentCaptor.getValue()).isEqualTo(testBooking.getId());
  }

}