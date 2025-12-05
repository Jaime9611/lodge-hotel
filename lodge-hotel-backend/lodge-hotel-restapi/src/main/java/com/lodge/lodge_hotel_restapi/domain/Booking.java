package com.lodge.lodge_hotel_restapi.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Booking {

  private Long id;
  private LocalDateTime createdAt;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private int numGuests;
  private int numNights;
  private BookingStatus status;
  private Guest guest;
  private List<Cabin> cabins;
  private BigDecimal totalPrice;
  private boolean isPaid;
}
