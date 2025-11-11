package com.lodge.lodge_hotel_restapi.persistence.repositories;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lodge.lodge_hotel_restapi.domain.Settings;
import java.io.File;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SettingsJsonRepository {

  private final ObjectMapper objectMapper;

  // Method to create a JSON file with default content
  public void createJsonFile(File file) throws IOException {
    if (!file.exists()) {
      Settings defaultData = Settings.builder()
          .minBookingLength(1)
          .maxBookingLength(4)
          .logoImage("")
          .build();

      saveJsonFile(file, defaultData);
      log.debug("SettingsRepository - File created with default content.");
    }
  }

  public Optional<Settings> readJsonFile(File file) {
    try {
      log.info(file.getPath());
      return Optional.ofNullable(objectMapper.readValue(file, Settings.class));
    } catch (IOException e) {
      return Optional.empty();
    }
  }

  // Method to save a Java object as JSON to a file
  public boolean saveJsonFile(File file, Settings settings) {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, settings);
      return true;
    } catch (IOException e) {
      return false;
    }
  }
}
