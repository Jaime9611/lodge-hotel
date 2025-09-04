package com.lodge.lodge_hotel_restapi.factories;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import java.util.List;
import java.util.stream.IntStream;

public class BookingFactory {

  public static final long TEST_ID = 1L;
  public static final String NAME = "Test Booking";

  public static Booking createSingleBooking(Long customId) {
    Cabin newCabin = CabinFactory.createSingleCabin();

    return Booking.builder()
        .id(customId)
        .cabin(newCabin)
        .build();
  }

  public static Booking createSingleBooking() {
    return createSingleBooking(TEST_ID);
  }

  public static List<Booking> createBookingList(int quantity) {
    return IntStream.range(0, quantity).mapToObj(i -> createSingleBooking((long) i)).toList();
  }

  public static BookingEntity createSingleBookingEntity(Long customId) {
    CabinEntity newCabin = CabinFactory.createSingleCabinEntity();

    return BookingEntity.builder()
        .id(customId)
        .cabin(newCabin)
        .build();
  }

  public static BookingEntity createSingleBookingEntity() {
    return createSingleBookingEntity(TEST_ID);
  }

  public static List<BookingEntity> createBookingEntityList(int quantity) {
    return IntStream.range(0, quantity).mapToObj(i -> createSingleBookingEntity((long) i)).toList();
  }

}
