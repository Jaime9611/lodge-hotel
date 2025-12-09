package com.lodge.security_service.utils.validations;


import com.lodge.security_service.utils.validations.exceptions.ItemAlreadyExistsException;
import com.lodge.security_service.utils.validations.exceptions.ItemNotFoundException;
import jakarta.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

  @ExceptionHandler(ItemAlreadyExistsException.class)
  public ResponseEntity<?> handleAlreadyExistException(
      ItemAlreadyExistsException exception) {

    Map<String, String> errorMap = new HashMap<>();
    errorMap.put("error", exception.getMessage());
    errorMap.put("status", HttpStatus.BAD_REQUEST.toString());

    return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ItemNotFoundException.class)
  public ResponseEntity<?> handleNotFoundException(ItemNotFoundException exception) {
    Map<String, String> errorMap = new HashMap<>();
    errorMap.put("error", exception.getMessage());
    errorMap.put("status", HttpStatus.NOT_FOUND.toString());

    return new ResponseEntity<>(errorMap, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<List<Map<String, String>>> handleBindError(
      MethodArgumentNotValidException exception) {
    List errorList = exception.getFieldErrors().stream()
        .map(fieldError -> {
          Map<String, String> errorMap = new HashMap<>();
          errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
          return errorMap;
        }).toList();

    return ResponseEntity.badRequest().body(errorList);
  }


  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<List<Map<String, String>>> handleJpaViolation(
      ConstraintViolationException exception) {

    ResponseEntity.BodyBuilder responseEntity = ResponseEntity.badRequest();

    if (exception instanceof ConstraintViolationException) {
      ConstraintViolationException ve = exception;

      List errorList = ve.getConstraintViolations().stream()
          .map(constraintViolation -> {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put(constraintViolation.getPropertyPath().toString(),
                constraintViolation.getMessage());
            return errorMap;
          }).toList();

      return responseEntity.body(errorList);
    }

    return responseEntity.build();
  }
}
