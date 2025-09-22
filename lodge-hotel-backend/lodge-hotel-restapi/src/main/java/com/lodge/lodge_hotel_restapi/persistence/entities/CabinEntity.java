package com.lodge.lodge_hotel_restapi.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cabin")
public class CabinEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @NotBlank
  @Column(length = 50, columnDefinition = "VARCHAR(50)")
  private String name;

  @NotNull
  private BigDecimal regularPrice;

  @CreationTimestamp
  @Column(updatable = false)
  private LocalDateTime createdAt;

  @NotNull
  private int maxCapacity;

  private BigDecimal discount;

  private String description;

  private String image;

  @JsonIgnore
  @ManyToMany(mappedBy = "cabins")
  private Set<BookingEntity> bookings = new HashSet<>();

}
