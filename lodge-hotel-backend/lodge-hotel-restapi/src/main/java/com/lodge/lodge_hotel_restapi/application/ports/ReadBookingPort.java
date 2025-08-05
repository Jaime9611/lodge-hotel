package com.lodge.lodge_hotel_restapi.application.ports;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import java.util.List;
import java.util.Optional;

public interface ReadBookingPort {

  Optional<Booking> get(Long id);

  List<Booking> getAll();
}
