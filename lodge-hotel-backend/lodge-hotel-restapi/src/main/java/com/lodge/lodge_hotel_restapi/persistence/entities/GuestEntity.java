package com.lodge.lodge_hotel_restapi.persistence.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "guest")
public class GuestEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
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
