package com.lodge.lodge_hotel_restapi.persistence.repositories;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lodge.lodge_hotel_restapi.domain.Settings;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SettingsJsonRepositoryTest {

  @Autowired
  ObjectMapper objectMapper;

  @Mock
  SettingsJsonRepository repository;

  @TempDir
  Path tempDir;

  @BeforeEach
  void setUp() {
    repository = new SettingsJsonRepository(objectMapper);
  }

  @Test
  void testSaveJson() throws IOException {
    Path filepath = tempDir.resolve("settings.json");
    File file = new File(filepath.toUri());

    Settings defaultData = Settings.builder()
        .minBookingLength(1)
        .maxBookingLength(2)
        .logoImage("test.jpg")
        .build();

    repository.saveJsonFile(file, defaultData);

    Settings savedSettings = objectMapper.readValue(file, Settings.class);

    assertTrue(Files.exists(filepath));
    assertThat(savedSettings.getMinBookingLength()).isEqualTo(defaultData.getMinBookingLength());
    assertThat(savedSettings.getMaxBookingLength()).isEqualTo(defaultData.getMaxBookingLength());
    assertEquals(savedSettings.getLogoImage(), defaultData.getLogoImage());
  }

  @Test
  void testCreateDefaultJson() throws IOException {
    Path filepath = tempDir.resolve("settings.json");
    File file = new File(filepath.toUri());

    repository.createJsonFile(file);

    Settings savedSettings = objectMapper.readValue(file, Settings.class);

    assertTrue(Files.exists(filepath));
    assertThat(savedSettings.getMinBookingLength()).isEqualTo(2);
    assertThat(savedSettings.getMaxBookingLength()).isEqualTo(4);
    assertEquals("http://localhost:8080/api/v1/storage/public/cabin/0.8260923462613396-logo-lodge.webp", savedSettings.getLogoImage());
  }

  @Test
  void testReadJson() throws IOException {
    Path filepath = tempDir.resolve("settings.json");
    File file = new File(filepath.toUri());

    Settings settings = Settings.builder()
        .minBookingLength(2)
        .maxBookingLength(3)
        .logoImage("test.jpg")
        .build();

    objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, settings);

    Settings savedSettings = repository.readJsonFile(file).get();


    assertTrue(Files.exists(filepath));
    assertThat(savedSettings.getMinBookingLength()).isEqualTo(settings.getMinBookingLength());
    assertThat(savedSettings.getMaxBookingLength()).isEqualTo(settings.getMaxBookingLength());
    assertEquals(savedSettings.getLogoImage(), settings.getLogoImage());
  }
}