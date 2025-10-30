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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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

  private BigDecimal totalPrice;

  @Enumerated(EnumType.STRING)
  private BookingStatus status;

  @ManyToOne
  @JoinColumn(name = "guest_id")
  private GuestEntity guest;

  @ManyToMany
  @JoinTable(
      name = "booking_cabin",
      joinColumns = @JoinColumn(name = "booking_id"),
      inverseJoinColumns = @JoinColumn(name = "cabin_id")
  )
  private Set<CabinEntity> cabins = new HashSet<>();

  //  private BigDecimal cabinPrice;
//  private BigDecimal extrasPrice;
//  private boolean hasBreakfast;
  private boolean isPaid;

  @Transient
  public Integer getNumNights() {
    return Math.toIntExact(ChronoUnit.DAYS.between(this.startDate, this.endDate));
  }

  @Transient
  public BigDecimal getTotalPrice() {
    return this.cabins.stream().map(CabinEntity::getRegularPrice)
        .reduce(BigDecimal.valueOf(0), BigDecimal::add)
        .multiply(BigDecimal.valueOf(this.getNumNights()));
  }
}
