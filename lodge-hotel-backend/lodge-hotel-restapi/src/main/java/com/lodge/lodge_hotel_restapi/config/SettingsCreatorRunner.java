package com.lodge.lodge_hotel_restapi.config;

import com.lodge.lodge_hotel_restapi.persistence.repositories.SettingsJsonRepository;
import java.io.File;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SettingsCreatorRunner implements CommandLineRunner {

  @Value("${settings.file-path}")
  private String FILE_PATH;

  private final SettingsJsonRepository settingsRepository;

  @Override
  public void run(String... args) throws Exception {

    File file = new File(FILE_PATH);
    if (!file.exists()) {
      try {
        settingsRepository.createJsonFile(file);
        log.info("Settings JSON: File created successfully ");
      } catch (IOException e) {
        log.error("Settings JSON: Error creating file: " + e.getMessage());
      }
    } else {
      log.info("Settings JSON: File already exists.");
    }

  }
}
