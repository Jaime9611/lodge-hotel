package com.lodge.lodge_hotel_restapi.utils.constants;

public class Endpoints {

  public static final String BASE_URL = "/api/v1";

  // CABINS
  public static final String CABIN = BASE_URL + "/cabin";
  public static final String CABIN_ID = "/{cabinId}";

  // GUEST
  public static final String GUEST = BASE_URL + "/guest";
  public static final String GUEST_ID = "/{guestId}";

  // BOOKINGS
  public static final String BOOKING = BASE_URL + "/booking";
  public static final String BOOKING_ID = "/{bookingId}";
  public static final String BOOKING_AFTER = "/after";
  public static final String BOOKING_TODAY = "/today-activity";
  public static final String BOOKING_QUOTATION = "/quotation";
  public static final String BOOKING_RESERVATIONS = "/reservations/{cabinId}";

  // Private constructor to prevent instantiation
  private Endpoints() {
    throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
  }
}
