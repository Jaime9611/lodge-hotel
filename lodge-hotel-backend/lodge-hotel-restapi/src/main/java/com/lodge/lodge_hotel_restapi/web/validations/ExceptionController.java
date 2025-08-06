package com.lodge.lodge_hotel_restapi.web.validations;

import com.lodge.lodge_hotel_restapi.web.validations.exceptions.ItemNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> handleNotFoundException(ItemNotFoundException exception) {
    ErrorResponse body = ErrorResponse.builder()
        .status(HttpStatus.NOT_FOUND.value())
        .error(exception.getMessage())
        .message(exception.getCause().getMessage())
        .build();

    return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
  }
}
