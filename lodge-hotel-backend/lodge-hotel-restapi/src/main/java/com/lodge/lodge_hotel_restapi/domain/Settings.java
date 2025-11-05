package com.lodge.lodge_hotel_restapi.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Settings {

  private int minBookingLength;

  private int maxBookingLength;

  private String logoImage;
}
