package com.lodge.lodge_hotel_restapi.application.ports.settings;

import com.lodge.lodge_hotel_restapi.domain.Settings;

public interface UpdateSettingPort {

  boolean updateSettings(Settings settings);
}
