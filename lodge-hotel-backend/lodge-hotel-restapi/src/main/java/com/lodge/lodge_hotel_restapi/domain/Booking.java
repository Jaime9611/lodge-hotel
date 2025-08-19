package com.lodge.lodge_hotel_restapi.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
  private BookingStatus status;
  private Long guestId;
  private Long cabinId;
//  private BigDecimal cabinPrice;
  private BigDecimal extrasPrice;
  private boolean hasBreakfast;
  private boolean isPaid;
}
