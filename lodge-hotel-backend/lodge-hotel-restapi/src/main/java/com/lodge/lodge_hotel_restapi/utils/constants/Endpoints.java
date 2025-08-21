package com.lodge.lodge_hotel_restapi.utils.constants;

public class Endpoints {

  public static final String BASE_URL = "/api/v1";

  // CABINS

  public static final String CABIN = BASE_URL + "/cabin";
  public static final String CABIN_ID = "/{cabinId}";


  // BOOKINGS
  public static final String BOOKING = BASE_URL + "/booking";
  public static final String BOOKING_ID = "/{bookingId}";

  // Private constructor to prevent instantiation
  private Endpoints() {
    throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
  }
}
