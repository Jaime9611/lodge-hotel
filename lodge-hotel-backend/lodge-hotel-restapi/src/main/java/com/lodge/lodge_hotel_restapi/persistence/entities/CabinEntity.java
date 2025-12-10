package com.lodge.lodge_hotel_restapi.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
  @Size(min = 5, max = 30, message = "Name must be between 5 and 30 characters long.")
  @Column(length = 50, columnDefinition = "VARCHAR(50)")
  private String name;

  @NotNull
  @DecimalMin(value = "0.0", inclusive = false)
  private BigDecimal regularPrice;

  @CreationTimestamp
  @Column(updatable = false)
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

  @NotNull
  @NotBlank
  private String image;

  @JsonIgnore
  @ManyToMany(mappedBy = "cabins")
  private Set<BookingEntity> bookings = new HashSet<>();

}
