package com.lodge.lodge_hotel_restapi.application.services;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;

public interface BookingService {

  public PageResponse<Booking> getAll(String cabinName, Integer pageNumber, Integer pageSize);

  Booking get(Long id);

  void delete(Long id);

  void update(Long id, Booking booking);

  Long save(Booking booking);
}
