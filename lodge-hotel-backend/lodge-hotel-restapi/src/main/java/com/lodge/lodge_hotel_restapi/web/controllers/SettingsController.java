package com.lodge.lodge_hotel_restapi.web.controllers;

import com.lodge.lodge_hotel_restapi.domain.Settings;
import com.lodge.lodge_hotel_restapi.persistence.SettingsPersistenceAdapter;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.utils.constants.UserConstants;
import com.lodge.lodge_hotel_restapi.web.validations.exceptions.ItemNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(Endpoints.SETTINGS)
public class SettingsController {

  private final SettingsPersistenceAdapter settingsPersistence;

  @GetMapping
  @PreAuthorize(UserConstants.MANAGER_ACCESS)
  public ResponseEntity<Settings> getSettings() {
    Settings response = settingsPersistence.getSettings().orElseThrow(ItemNotFoundException::new);

    return ResponseEntity.ok(response);
  }

  @PutMapping
  @PreAuthorize(UserConstants.MANAGER_ACCESS)
  public ResponseEntity updateSettings(@RequestBody Settings settings) {
    boolean success = settingsPersistence.updateSettings(settings);
    if(!success) {
      return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity(HttpStatus.NO_CONTENT);
  }

}
