package com.lodge.lodge_hotel_restapi.application.services;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.BookingStatus;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingQuotationDto;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingSimpleDto;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface BookingService {

  BigDecimal getBookingQuotation(BookingQuotationDto booking);

  PageResponse<Booking> getAll(BookingStatus status, String sortBy, String direction, Integer pageNumber, Integer pageSize);

  PageResponse<Booking> getAllAfterDate(boolean fromCreation, LocalDate date, Integer pageNumber, Integer pageSize);

  PageResponse<Booking> getTodaysActivity(Integer pageNumber, Integer pageSize);

  List<Booking> getBookedReservations(Long cabinId);

  Booking get(Long id);

  void delete(Long id);

  void update(Long id, Booking booking);

  void updateBookingStatus(Long id, BookingStatus status);

  Long save(BookingSimpleDto booking);
}
