package com.lodge.lodge_hotel_restapi.web.controllers;

import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(Endpoints.CABIN)
public class CabinController {

  private final CabinService cabinService;

  @GetMapping
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<PageResponse<Cabin>> getAll(@RequestParam(required = false) String cabinName,
      @RequestParam(required = false) Integer pageNumber,
      @RequestParam(required = false) Integer pageSize) {
    log.debug("GET - All Cabins in Controller");

    return ResponseEntity.ok(cabinService.getAll(cabinName, pageNumber, pageSize));
  }

  @GetMapping(Endpoints.CABIN_ID)
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<Cabin> getCabin(@PathVariable Long cabinId) {
    log.debug("GET - Get Cabin by Id: {} in Controller", cabinId);

    return ResponseEntity.ok(cabinService.get(cabinId));
  }

  @PostMapping
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<Void> createCabin(@RequestBody Cabin cabin) {
    log.debug("POST - Create Cabin in Controller");

    Long savedCabinId = cabinService.save(cabin);

    HttpHeaders headers = new HttpHeaders();
    headers.add("Location", String.format("%s/%s", Endpoints.CABIN, savedCabinId));

    return new ResponseEntity<>(headers, HttpStatus.CREATED);
  }

  @PutMapping(Endpoints.CABIN_ID)
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<?> updateCabinById(@PathVariable Long cabinId,
      @RequestBody Cabin cabin) {
    log.debug("PUT - Update Cabin by Id: {} in Controller", cabinId);

    cabinService.update(cabinId, cabin);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping(Endpoints.CABIN_ID)
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<?> deleteCabinById(@PathVariable Long cabinId) {
    log.debug("DELETE - Delete Cabin by Id: {} in Controller", cabinId);

    cabinService.delete(cabinId);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
