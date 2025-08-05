package com.lodge.lodge_hotel_restapi.persistence.entities.mappers;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;

public interface BookingMapper {

  BookingEntity bookingToBookingEntity(Booking booking);

  Booking bookingEntityToBooking(BookingEntity entity);
}
