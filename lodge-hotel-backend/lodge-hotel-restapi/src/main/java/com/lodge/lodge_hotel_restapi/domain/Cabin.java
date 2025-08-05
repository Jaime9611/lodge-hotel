package com.lodge.lodge_hotel_restapi.domain;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;


@Data
@Builder
public class Cabin {

  private Long id;
  private String name;
  private BigDecimal price;
}
