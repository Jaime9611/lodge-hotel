package com.lodge.lodge_hotel_restapi.web.controllers;

import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(Endpoints.CABIN)
public class CabinController {

  private final CabinService cabinService;

  @GetMapping(Endpoints.CABIN_ID)
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<Cabin> getCabin(@PathVariable Long cabinId) {
    return ResponseEntity.ok(cabinService.get(cabinId));
  }
}
