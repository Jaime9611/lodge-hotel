package com.lodge.lodge_hotel_restapi.application.services;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingQuotationDto;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingSimpleDto;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import java.math.BigDecimal;

public interface BookingService {

  public BigDecimal getBookingQuotation(BookingQuotationDto booking);

  public PageResponse<Booking> getAll(String cabinName, Integer pageNumber, Integer pageSize);

  Booking get(Long id);

  void delete(Long id);

  void update(Long id, Booking booking);

  Long save(BookingSimpleDto booking);
}
