package com.lodge.lodge_hotel_restapi.persistence.entities;

import com.lodge.lodge_hotel_restapi.domain.BookingStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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

  @CreationTimestamp
  @Column(updatable = false)
  private LocalDateTime createdAt;

  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private int numGuests;

  @Enumerated(EnumType.STRING)
  private BookingStatus status;

  @ManyToOne
  @JoinColumn(name = "guest_id")
  private GuestEntity guest;

  @ManyToOne
  @JoinColumn(name = "cabin_id")
  private CabinEntity cabin;

//  private BigDecimal cabinPrice;
  private BigDecimal extrasPrice;
  private boolean hasBreakfast;
  private boolean isPaid;
}
