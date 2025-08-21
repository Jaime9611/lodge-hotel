package com.lodge.lodge_hotel_restapi.application.ports;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ReadBookingPort {

  Optional<Booking> get(Long id);

  Page<Booking> getAll(PageRequest pageRequest);
}
