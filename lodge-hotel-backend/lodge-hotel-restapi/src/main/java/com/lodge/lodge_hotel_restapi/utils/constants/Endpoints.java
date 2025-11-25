package com.lodge.lodge_hotel_restapi.utils.constants;

public class Endpoints {

  public static final String BASE_URL = "/api/v1";

  // SETTINGS
  public static final String SETTINGS = BASE_URL + "/settings";

  // CABINS
  public static final String CABIN = BASE_URL + "/cabin";
  public static final String CABIN_ID = "/{cabinId}";
  public static final String CABIN_DETAIL = "/detail/{cabinId}";
  public static final String CABINS_BY_CAPACITY = "/capacity";

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

  // IMAGES
  public static final String STORAGE = BASE_URL + "/storage";
  public static final String IMAGES = "cabin-images";
  public static final String GET_IMAGE = "public/cabin/{imageName}";


  // Private constructor to prevent instantiation
  private Endpoints() {
    throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
  }
}
