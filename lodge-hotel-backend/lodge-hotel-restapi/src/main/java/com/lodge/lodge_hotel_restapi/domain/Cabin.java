package com.lodge.lodge_hotel_restapi.domain;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;


@Data
@Builder
public class Cabin {

  private Long id;

  @NotBlank
  @NotNull
  @Size(min = 5, max = 30, message = "Name must be between 5 and 30 characters long.")
  private String name;

  @NotNull
  @DecimalMin(value = "0.0", inclusive = false)
  private BigDecimal regularPrice;

  private LocalDateTime createdAt;

  @NotNull
  @Min(1)
  private int maxCapacity;

  @NotNull
  @DecimalMin(value = "0.0")
  private BigDecimal discount;

  @NotBlank
  @NotNull
  @Size(min = 10, max = 160)
  private String description;

  @NotBlank
  @NotNull
  private String image;
}
