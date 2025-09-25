package com.lodge.lodge_hotel_restapi.web.dtos;

import com.lodge.lodge_hotel_restapi.domain.BookingStatus;
import com.lodge.lodge_hotel_restapi.domain.Guest;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookingSimpleDto {

  private Long id;
  private LocalDateTime createdAt;
  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private int numGuests;
  private int numbNights;
  private BookingStatus status;
  private Guest guest;
  private List<CabinSimpleDto> cabins;
  private BigDecimal totalPrice;
  private boolean isPaid;

}
