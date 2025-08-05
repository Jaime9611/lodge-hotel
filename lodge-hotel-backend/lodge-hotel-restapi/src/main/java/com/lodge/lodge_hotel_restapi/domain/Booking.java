package com.lodge.lodge_hotel_restapi.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Booking {

  private Long id;
  private String name;
}
