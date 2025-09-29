package com.lodge.lodge_hotel_restapi.application.ports.booking;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ReadBookingPort {

  Optional<Booking> get(Long id);

  Page<Booking> getAll(PageRequest pageRequest);

  Page<Booking> getAfterDate(LocalDate start, LocalDate end, PageRequest pageRequest);

  Page<Booking> getStaysAfterDate(LocalDate date, PageRequest pageRequest);
}
