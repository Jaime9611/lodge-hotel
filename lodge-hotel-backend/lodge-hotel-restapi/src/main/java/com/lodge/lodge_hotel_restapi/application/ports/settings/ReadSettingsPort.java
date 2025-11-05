package com.lodge.lodge_hotel_restapi.application.ports.settings;

import com.lodge.lodge_hotel_restapi.domain.Settings;
import java.util.Optional;

public interface ReadSettingsPort {

  Optional<Settings> getSettings();
}
