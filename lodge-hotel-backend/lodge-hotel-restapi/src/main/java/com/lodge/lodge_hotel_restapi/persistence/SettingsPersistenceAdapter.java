package com.lodge.lodge_hotel_restapi.persistence;

import com.lodge.lodge_hotel_restapi.application.ports.settings.ReadSettingsPort;
import com.lodge.lodge_hotel_restapi.application.ports.settings.UpdateSettingPort;
import com.lodge.lodge_hotel_restapi.domain.Settings;
import com.lodge.lodge_hotel_restapi.persistence.repositories.SettingsJsonRepository;
import java.io.File;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SettingsPersistenceAdapter implements ReadSettingsPort, UpdateSettingPort {

  private final SettingsJsonRepository settingsRepository;

  @Value("${settings.file-path}")
  private String FILE_PATH;

  @Override
  public Optional<Settings> getSettings() {
    File file = new File(FILE_PATH);

    return settingsRepository.readJsonFile(file);
  }

  @Override
  public boolean updateSettings(Settings settings) {
    File file = new File(FILE_PATH);

    return settingsRepository.saveJsonFile(file, settings);
  }
}
