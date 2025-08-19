package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.Booking.BookingBuilder;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.BookingMapper;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.CabinMapper;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.GuestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookingMapperImpl implements BookingMapper {

  CabinMapper cabinMapper;
  GuestMapper guestMapper;


  @Override
  public BookingEntity bookingToBookingEntity(Booking booking) {
    if (booking == null) {
      return null;
    }

    BookingEntity.BookingEntityBuilder entity = BookingEntity.builder();
    entity.id(booking.getId());
    entity.extrasPrice(booking.getExtrasPrice());
    entity.createdAt(booking.getCreatedAt());
    entity.startDate(booking.getStartDate());
    entity.endDate(booking.getEndDate());
    entity.hasBreakfast(booking.isHasBreakfast());
    entity.isPaid(booking.isPaid());
    entity.cabin(cabinMapper.cabinToCabinEntity(booking.getCabin()));
    entity.guest(guestMapper.guestToGuestEntity(booking.getGuest()));

    return entity.build();
  }

  @Override
  public Booking bookingEntityToBooking(BookingEntity entity) {
    if ( entity == null) {
      return null;
    }

    BookingBuilder booking = Booking.builder();
    booking.id(entity.getId());
    booking.extrasPrice(entity.getExtrasPrice());
    booking.createdAt(entity.getCreatedAt());
    booking.startDate(entity.getStartDate());
    booking.endDate(entity.getEndDate());
    booking.hasBreakfast(entity.isHasBreakfast());
    booking.isPaid(entity.isPaid());
    booking.cabin(cabinMapper.cabinEntityToCabin(entity.getCabin()));
    booking.guest(guestMapper.guestEntityToGuest(entity.getGuest()));

    return booking.build();
  }
}
