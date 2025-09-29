package com.lodge.lodge_hotel_restapi.application.services;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingQuotationDto;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingSimpleDto;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import java.math.BigDecimal;
import java.time.LocalDate;

public interface BookingService {

  BigDecimal getBookingQuotation(BookingQuotationDto booking);

  PageResponse<Booking> getAll(String cabinName, Integer pageNumber, Integer pageSize);

  PageResponse<Booking> getAllAfterDate(boolean fromCreation, LocalDate date, Integer pageNumber, Integer pageSize);

  Booking get(Long id);

  void delete(Long id);

  void update(Long id, Booking booking);

  Long save(BookingSimpleDto booking);
}
