package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.Booking.BookingBuilder;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.BookingMapper;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.CabinMapper;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.GuestMapper;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookingMapperImpl implements BookingMapper {

  private final CabinMapper cabinMapper;
  private final GuestMapper guestMapper;


  @Override
  public BookingEntity bookingToBookingEntity(Booking booking) {
    if (booking == null) {
      return null;
    }

    BookingEntity.BookingEntityBuilder entity = BookingEntity.builder();
    entity.id(booking.getId());
    entity.createdAt(booking.getCreatedAt());
    entity.startDate(booking.getStartDate());
    entity.endDate(booking.getEndDate());
    entity.isPaid(booking.isPaid());
    entity.status(booking.getStatus());

    Set<CabinEntity> parsedCabins = new HashSet<>();
    if (booking.getCabins() != null) {
      parsedCabins = booking.getCabins().stream().map(cabinMapper::cabinToCabinEntity).collect(
          Collectors.toSet());
    }
    entity.cabins(parsedCabins);
    entity.guest(guestMapper.guestToGuestEntity(booking.getGuest()));

    return entity.build();
  }

  @Override
  public Booking bookingEntityToBooking(BookingEntity entity) {
    if (entity == null) {
      return null;
    }

    BookingBuilder booking = Booking.builder();
    booking.id(entity.getId());

    booking.createdAt(entity.getCreatedAt());
    booking.startDate(entity.getStartDate());
    booking.endDate(entity.getEndDate());
    booking.isPaid(entity.isPaid());
    booking.status(entity.getStatus());
    List<Cabin> parsedCabins = new ArrayList<>();

    if (entity.getCabins() != null) {
      parsedCabins = entity.getCabins().stream().map(cabinMapper::cabinEntityToCabin).toList();
    }

    booking.cabins(parsedCabins);
    booking.guest(guestMapper.guestEntityToGuest(entity.getGuest()));
    booking.numbNights(entity.getNumNights());
    booking.totalPrice(entity.getTotalPrice());

    return booking.build();
  }
}
