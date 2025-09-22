package com.lodge.lodge_hotel_restapi.application.ports.booking;

import com.lodge.lodge_hotel_restapi.domain.Booking;

public interface CreateBookingPort {

  Booking save(Booking booking);
}
