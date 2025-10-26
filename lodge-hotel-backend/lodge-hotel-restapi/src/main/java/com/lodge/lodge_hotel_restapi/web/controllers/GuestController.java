package com.lodge.lodge_hotel_restapi.web.controllers;

import com.lodge.lodge_hotel_restapi.application.services.GuestService;
import com.lodge.lodge_hotel_restapi.domain.Guest;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.utils.constants.UserConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(Endpoints.GUEST)
public class GuestController {

  private final GuestService guestService;

  @PostMapping
  @PreAuthorize(UserConstants.AUTH_ACCESS)
  public ResponseEntity<Long> createGuest(@RequestBody Guest guest) {
    log.debug("POST - Create Cabin in Controller");

    Long savedGuestId = guestService.save(guest);

    return new ResponseEntity<Long>(savedGuestId, HttpStatus.CREATED);
  }
}
