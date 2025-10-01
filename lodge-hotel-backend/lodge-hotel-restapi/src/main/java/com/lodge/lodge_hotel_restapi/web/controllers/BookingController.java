package com.lodge.lodge_hotel_restapi.web.controllers;

import com.lodge.lodge_hotel_restapi.application.services.BookingService;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.BookingStatus;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.utils.constants.UserConstants;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingQuotationDto;
import com.lodge.lodge_hotel_restapi.web.dtos.BookingSimpleDto;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(Endpoints.BOOKING)
@RequiredArgsConstructor
public class BookingController {

  private final BookingService bookingService;

  @PostMapping(Endpoints.BOOKING_QUOTATION)
  @PreAuthorize(UserConstants.EMPLOYEE_ACCESS)
  public ResponseEntity<BigDecimal> getBookingQuotation(@RequestBody BookingQuotationDto booking) {
    log.debug("POST - booking quotation in Controller");

    return ResponseEntity.ok(bookingService.getBookingQuotation(booking));
  }

  @GetMapping
  @PreAuthorize(UserConstants.EMPLOYEE_ACCESS)
  public ResponseEntity<PageResponse<Booking>> getAll(
      @RequestParam(required = false) String bookingName,
      @RequestParam(required = false) Integer pageNumber,
      @RequestParam(required = false) Integer pageSize) {
    log.debug("GET - All Bookings in Controller");

    return ResponseEntity.ok(bookingService.getAll(bookingName, pageNumber, pageSize));
  }

  @GetMapping(Endpoints.BOOKING_AFTER)
  @PreAuthorize(UserConstants.EMPLOYEE_ACCESS)
  public ResponseEntity<PageResponse<Booking>> getAllAfterDate(
      @RequestParam(required = false) boolean fromCreation,
      @RequestParam(required = true) LocalDate date,
      @RequestParam(required = false) Integer pageNumber,
      @RequestParam(required = false) Integer pageSize) {
    log.debug("GET - All Bookings after date in Controller");

    return ResponseEntity.ok(bookingService.getAllAfterDate(fromCreation, date, pageNumber, pageSize));
  }

  @GetMapping(Endpoints.BOOKING_TODAY)
  @PreAuthorize(UserConstants.EMPLOYEE_ACCESS)
  public ResponseEntity<PageResponse<Booking>> getTodaysActivity(
      @RequestParam(required = false) Integer pageNumber,
      @RequestParam(required = false) Integer pageSize) {
    log.debug("GET - All Bookings for todays activity in Controller");

    return ResponseEntity.ok(bookingService.getTodaysActivity(pageNumber, pageSize));
  }

  @GetMapping(Endpoints.BOOKING_ID)
  @PreAuthorize(UserConstants.EMPLOYEE_ACCESS)
  public ResponseEntity<Booking> getBooking(@PathVariable Long bookingId) {
    log.debug("GET - Get Booking by Id: {} in Controller", bookingId);

    return ResponseEntity.ok(bookingService.get(bookingId));
  }

  @PostMapping
  @PreAuthorize(UserConstants.EMPLOYEE_ACCESS)
  public ResponseEntity<Void> createBooking(@RequestBody BookingSimpleDto booking) {
    log.debug("POST - Create Booking in Controller");

    Long savedBookingId = bookingService.save(booking);

    HttpHeaders headers = new HttpHeaders();
    headers.add("Location", String.format("%s/%s", Endpoints.BOOKING, savedBookingId));

    return new ResponseEntity<>(headers, HttpStatus.CREATED);
  }

  @PutMapping(Endpoints.BOOKING_ID)
  @PreAuthorize(UserConstants.EMPLOYEE_ACCESS)
  public ResponseEntity<?> updateBookingById(@PathVariable Long bookingId,
      @RequestBody Booking booking) {
    log.debug("PUT - Update Booking by Id: {} in Controller", bookingId);

    bookingService.update(bookingId, booking);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @PatchMapping(Endpoints.BOOKING_ID)
  @PreAuthorize(UserConstants.EMPLOYEE_ACCESS)
  public ResponseEntity<?> updateBookingStatus(@PathVariable Long bookingId,
      @RequestBody BookingStatus status) {
    log.debug("PATCH - Check-in-out Booking by Id: {} in Controller", bookingId);

    bookingService.updateBookingStatus(bookingId, status);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping(Endpoints.BOOKING_ID)
  @PreAuthorize(UserConstants.EMPLOYEE_ACCESS)
  public ResponseEntity<?> deleteBookingById(@PathVariable Long bookingId) {
    log.debug("DELETE - Delete Booking by Id: {} in Controller", bookingId);

    bookingService.delete(bookingId);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
