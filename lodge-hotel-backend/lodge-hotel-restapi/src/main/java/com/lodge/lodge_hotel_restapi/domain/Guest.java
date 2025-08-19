package com.lodge.lodge_hotel_restapi.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Guest {

  private Long id;
  private String fullName;
  private String email;
  private String country;
  private String countryFlag;
  private String nationalId;
}
