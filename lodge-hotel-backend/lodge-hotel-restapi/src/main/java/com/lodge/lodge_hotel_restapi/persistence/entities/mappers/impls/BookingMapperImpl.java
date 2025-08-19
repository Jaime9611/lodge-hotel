package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.BookingMapper;
import org.springframework.stereotype.Component;

@Component
public class BookingMapperImpl implements BookingMapper {

  @Override
  public BookingEntity bookingToBookingEntity(Booking booking) {
    if (booking == null) {
      return null;
    }

    BookingEntity.BookingEntityBuilder entity = BookingEntity.builder();
    entity.id(booking.getId());

    return entity.build();
  }

  @Override
  public Booking bookingEntityToBooking(BookingEntity entity) {
    if (entity == null) {
      return null;
    }

    Booking.BookingBuilder domain = Booking.builder();
    domain.id(entity.getId());

    return domain.build();
  }
}
