package com.lodge.lodge_hotel_restapi.web.validations;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {

  private String error;
  private String message;
  private Integer status;
}
