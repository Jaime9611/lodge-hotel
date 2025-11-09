package com.lodge.lodge_hotel_restapi.persistence;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lodge.lodge_hotel_restapi.domain.Settings;
import com.lodge.lodge_hotel_restapi.persistence.repositories.SettingsJsonRepository;
import java.io.File;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.util.ReflectionTestUtils;

class SettingsPersistenceAdapterTest {

  @Autowired
  ObjectMapper objectMapper;

  @Mock
  SettingsJsonRepository settingsJsonRepository;


  SettingsPersistenceAdapter persistenceAdapter;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    persistenceAdapter = new SettingsPersistenceAdapter(settingsJsonRepository);
    ReflectionTestUtils.setField(persistenceAdapter, "FILE_PATH", "src/test/resources/settings.json");
  }

  @Test
  void testGetSettings() {
    // Arrange
    Settings testSettings = Settings.builder().minBookingLength(2)
        .maxBookingLength(4)
        .logoImage("http://test-logo.jpg").build();

    given(settingsJsonRepository.readJsonFile(any(File.class))).willReturn(Optional.of(testSettings));

    // Act
    persistenceAdapter.getSettings();

    // Assert
    verify(settingsJsonRepository, times(1)).readJsonFile(any(File.class));
  }

}