package com.lodge.lodge_hotel_restapi.domain;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Guest {

  private Long id;

  @NotNull
  @NotBlank
  @Size(min = 5, max = 30, message = "Name must be between 5 and 30 characters long.")
  private String fullName;

  @NotNull
  @NotBlank
  @Email
  private String email;

  @NotNull
  @NotBlank
  private String country;

  @NotNull
  @NotBlank
  private String countryFlag;

  @NotNull
  @NotBlank
  private String nationalId;
}
