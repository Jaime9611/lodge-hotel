package com.lodge.lodge_hotel_restapi.web.controllers;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lodge.lodge_hotel_restapi.application.ports.settings.ReadSettingsPort;
import com.lodge.lodge_hotel_restapi.application.ports.settings.UpdateSettingPort;
import com.lodge.lodge_hotel_restapi.config.KeyStoreConfig;
import com.lodge.lodge_hotel_restapi.config.SecurityConfig;
import com.lodge.lodge_hotel_restapi.domain.Settings;
import com.lodge.lodge_hotel_restapi.persistence.SettingsPersistenceAdapter;
import com.lodge.lodge_hotel_restapi.persistence.repositories.SettingsJsonRepository;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(SettingsController.class)
@Import({SecurityConfig.class, KeyStoreConfig.class})
class SettingsControllerTest {

  @Autowired
  MockMvc mockMvc;

  @Autowired
  ObjectMapper objectMapper;


  @MockitoBean
  ReadSettingsPort readSettingsPort;

  @MockitoBean
  UpdateSettingPort updateSettingPort;

  @MockitoBean
  SettingsJsonRepository settingRepository;

  SettingsPersistenceAdapter settingsPersistenceAdapter;

  @BeforeEach
  void setUp() {
    settingsPersistenceAdapter = new SettingsPersistenceAdapter(new SettingsJsonRepository(objectMapper));

  }

  @Test
  @WithMockUser(username = "", authorities = {})
  void testGetSettings() throws Exception {
    // Arrange
    Settings testSettings = Settings.builder().minBookingLength(2)
        .maxBookingLength(4)
        .logoImage("http://test-logo.jpg").build();

    given(readSettingsPort.getSettings()).willReturn(Optional.ofNullable(testSettings));

    // Assert
    mockMvc.perform(get(Endpoints.SETTINGS).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.minBookingLength").value(2))
        .andExpect(jsonPath("$.maxBookingLength").value(4))
        .andExpect(jsonPath("$.logoImage").isString());
  }
}