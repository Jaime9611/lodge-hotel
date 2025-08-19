package com.lodge.lodge_hotel_restapi.factories;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import java.util.List;
import java.util.stream.IntStream;

public class BookingFactory {

  public static final long TEST_ID = 1L;
  public static final String NAME = "Test Booking";

  public static Booking createSingleBooking(Long customId) {
    return Booking.builder()
        .id(customId)
        .build();
  }

  public static Booking createSingleBooking() {
    return createSingleBooking(TEST_ID);
  }

  public static BookingEntity createSingleBookingEntity(Long customId) {
    return BookingEntity.builder()
        .id(customId)
        .build();
  }

  public static BookingEntity createSingleBookingEntity() {
    return createSingleBookingEntity(TEST_ID);
  }

  public static List<BookingEntity> createBookingEntityList(int quantity) {
    return IntStream.range(0, quantity).mapToObj(i -> createSingleBookingEntity((long) i)).toList();
  }

}
