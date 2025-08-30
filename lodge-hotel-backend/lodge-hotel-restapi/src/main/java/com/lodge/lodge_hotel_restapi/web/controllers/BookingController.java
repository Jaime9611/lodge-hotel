package com.lodge.lodge_hotel_restapi.web.controllers;

import com.lodge.lodge_hotel_restapi.application.services.BookingService;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

  @GetMapping
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<PageResponse<Booking>> getAll(
      @RequestParam(required = false) String cabinName,
      @RequestParam(required = false) Integer pageNumber,
      @RequestParam(required = false) Integer pageSize) {
    log.debug("GET - All Bookings in Controller");

    return ResponseEntity.ok(bookingService.getAll(cabinName, pageNumber, pageSize));
  }

  @GetMapping(Endpoints.BOOKING_ID)
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<Booking> getCabin(@PathVariable Long bookingId) {
    log.debug("GET - Get Booking by Id: {} in Controller", bookingId);

    return ResponseEntity.ok(bookingService.get(bookingId));
  }

  @PutMapping(Endpoints.BOOKING_ID)
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<?> updateBookingById(@PathVariable Long bookingId,
      @RequestBody Booking booking) {
    log.debug("PUT - Update Cabin by Id: {} in Controller", bookingId);

    bookingService.update(bookingId, booking);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping(Endpoints.BOOKING_ID)
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<?> deleteBookingById(@PathVariable Long bookingId) {
    log.debug("DELETE - Delete Cabin by Id: {} in Controller", bookingId);

    bookingService.delete(bookingId);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
