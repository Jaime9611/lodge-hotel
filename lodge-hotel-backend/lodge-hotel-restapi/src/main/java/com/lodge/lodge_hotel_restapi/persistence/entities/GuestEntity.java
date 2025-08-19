package com.lodge.lodge_hotel_restapi.persistence.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
  private String fullName;

  @NotNull
  @NotBlank
  private String email;
  private String country;
  private String countryFlag;
  private String nationalId;

//  @JsonIgnore
//  @OneToMany(fetch = FetchType.LAZY)
//  @MapsId("id")
//  @JoinColumn(name = "id")
//  private Set<BookingEntity> bookings;
}
