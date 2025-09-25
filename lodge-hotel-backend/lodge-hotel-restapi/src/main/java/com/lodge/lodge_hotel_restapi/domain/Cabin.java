package com.lodge.lodge_hotel_restapi.domain;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;


@Data
@Builder
public class Cabin {

  private Long id;
  private String name;
  private BigDecimal regularPrice;
  private LocalDateTime createdAt;
  private int maxCapacity;
  private BigDecimal discount;
  private String description;
  private String image;
}
