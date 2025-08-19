package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.services.BookingService;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;

public class BookingServiceImpl implements BookingService {

  @Override
  public PageResponse<Booking> getAll(String cabinName, Integer pageNumber, Integer pageSize) {
    return null;
  }

  @Override
  public Booking get(Long id) {
    return null;
  }

  @Override
  public void delete(Long id) {

  }

  @Override
  public void update(Long id, Booking booking) {

  }

  @Override
  public Long save(Booking booking) {
    return 0L;
  }
}
