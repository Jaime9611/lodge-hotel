package com.lodge.lodge_hotel_restapi.application.ports;

import com.lodge.lodge_hotel_restapi.domain.Booking;

public interface CreateBookingPort {

  Booking save(Booking booking);
}
