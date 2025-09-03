package com.lodge.lodge_hotel_restapi.factories;

import com.lodge.lodge_hotel_restapi.domain.Guest;
import com.lodge.lodge_hotel_restapi.persistence.entities.GuestEntity;
import java.util.List;
import java.util.stream.IntStream;

public class GuestFactory {
  public static final long TEST_ID = 1L;
  public static final String NAME = "Test Guest";
  public static final String EMAIL = "test@mail.co";
  public static final String COUNTRY = "CO";
  public static final String COUNTRY_FLAG = "http://country-flag/co";
  public static final String NATIONAL_ID = "CO123";

  public static Guest createSingleGuest(Long customId) {
    return Guest.builder()
        .id(customId)
        .fullName(String.valueOf(NAME + customId))
        .email(EMAIL)
        .country(COUNTRY)
        .countryFlag(COUNTRY_FLAG)
        .nationalId(NATIONAL_ID)
        .build();
  }

  public static Guest createSingleGuest() {
    return createSingleGuest(TEST_ID);
  }

  public static GuestEntity createSingleGuestEntity(Long customId) {
    return GuestEntity.builder()
        .id(customId)
        .fullName(String.valueOf(NAME + customId))
        .email(EMAIL)
        .country(COUNTRY)
        .countryFlag(COUNTRY_FLAG)
        .nationalId(NATIONAL_ID)
        .build();
  }

  public static GuestEntity createSingleGuestEntity() {
    return createSingleGuestEntity(TEST_ID);
  }

  public static List<Guest> createGuestList(int quantity) {
    return IntStream.range(0, quantity).mapToObj(i -> createSingleGuest((long) i)).toList();
  }

  public static List<GuestEntity> createGuestEntityList(int quantity) {
    return IntStream.range(0, quantity).mapToObj(i -> createSingleGuestEntity((long) i)).toList();
  }
}
