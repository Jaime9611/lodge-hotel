package com.lodge.lodge_hotel_restapi.web.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CabinSimpleDto {

  private Long id;
  private String name;
}
