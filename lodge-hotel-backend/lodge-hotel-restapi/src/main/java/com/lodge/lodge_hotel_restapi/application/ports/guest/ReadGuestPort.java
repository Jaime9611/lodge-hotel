package com.lodge.lodge_hotel_restapi.application.ports.guest;

import com.lodge.lodge_hotel_restapi.domain.Guest;
import java.util.Optional;

public interface ReadGuestPort {

  Optional<Guest> get(Long id);
}
