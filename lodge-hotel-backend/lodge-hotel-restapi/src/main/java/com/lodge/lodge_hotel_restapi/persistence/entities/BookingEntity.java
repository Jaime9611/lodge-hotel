package com.lodge.lodge_hotel_restapi.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
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
@Table(name = "booking")
public class BookingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @NotBlank
  @Column(length = 50, columnDefinition = "VARCHAR(50)")
  private String name;

  @CreationTimestamp
  @Column(updatable = false)
  private LocalDateTime createdAt;

  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private int numGuests;
  private String status;

  @ManyToOne
  @JoinColumn(name = "guest_id")
  private GuestEntity guest;

  @ManyToOne
  @JoinColumn(name = "cabin_id")
  private CabinEntity cabin;

  private BigDecimal cabinPrice;
  private BigDecimal extrasPrice;
  private boolean hasBreakfast;
  private boolean isPaid;
}
