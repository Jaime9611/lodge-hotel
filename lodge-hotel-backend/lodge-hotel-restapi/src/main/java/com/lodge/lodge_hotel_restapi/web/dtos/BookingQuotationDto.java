package com.lodge.lodge_hotel_restapi.web.dtos;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookingQuotationDto {

  private LocalDateTime startDate;
  private LocalDateTime endDate;
  private List<CabinSimpleDto> cabins;
}
