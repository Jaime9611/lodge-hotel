package com.lodge.lodge_hotel_restapi.web.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lodge.lodge_hotel_restapi.application.ports.CreateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.DeleteBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.UpdateBookingPort;
import com.lodge.lodge_hotel_restapi.application.services.BookingService;
import com.lodge.lodge_hotel_restapi.application.services.impls.BookingServiceImpl;
import com.lodge.lodge_hotel_restapi.config.KeyStoreConfig;
import com.lodge.lodge_hotel_restapi.config.SecurityConfig;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.factories.BookingFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
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

  @Captor
  ArgumentCaptor<Long> idArgumentCaptor;

  @Captor
  ArgumentCaptor<Booking> bookingArgumentCaptor;

  @Mock
  PageMapper pageMapper;

  @MockitoBean
  BookingService bookingService;

  BookingServiceImpl bookingServiceImpl;

  @BeforeEach
  void setUp() {
    bookingServiceImpl = new BookingServiceImpl(readPort, createPort, deletePort, updatePort,
        pageMapper);
  }

  @Test
  @WithMockUser(username = "testuser", authorities = {"ROLE_USER"})
  void testGetBookings() throws Exception {
    // Arrange
    List<Booking> testBookings = BookingFactory.createBookingList(2);

    long totalElements = 2;
    PageResponse.PageResponseBuilder<Booking> pageResponse = PageResponse.builder();

    given(bookingService.getAll(null, null, null)).willReturn(
        pageResponse.content(testBookings).totalElements(totalElements).build());

    // Assert
    mockMvc.perform(get(Endpoints.BOOKING).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray())
        .andExpect(jsonPath("$.totalElements").value(2));
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {"ROLE_USER"})
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
  @WithMockUser(username = "testUser", authorities = {"ROLE_USER"})
  void testUpdateCabin() throws Exception {
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
  @WithMockUser(username = "testUser", authorities = {"ROLE_USER"})
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