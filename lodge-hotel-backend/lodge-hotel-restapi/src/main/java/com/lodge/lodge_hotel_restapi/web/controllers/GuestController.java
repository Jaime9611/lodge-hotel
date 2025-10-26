package com.lodge.lodge_hotel_restapi.web.controllers;

import com.lodge.lodge_hotel_restapi.application.services.GuestService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.utils.constants.UserConstants;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(Endpoints.GUEST)
public class GuestController {

  private final GuestService guestService;

  @GetMapping
  @PreAuthorize(UserConstants.AUTH_ACCESS)
  public ResponseEntity<PageResponse<Cabin>> getAll(
      @RequestParam(required = false) String cabinName,
      @RequestParam(required = false) Integer pageNumber,
      @RequestParam(required = false) Integer pageSize) {
    log.debug("GET - All Cabins in Controller");

    return ResponseEntity.ok(guestService.getAll(cabinName, pageNumber, pageSize));
  }
}
