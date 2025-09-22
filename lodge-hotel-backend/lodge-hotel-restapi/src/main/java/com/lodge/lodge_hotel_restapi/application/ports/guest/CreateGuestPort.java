package com.lodge.lodge_hotel_restapi.application.ports.guest;

import com.lodge.lodge_hotel_restapi.domain.Guest;

public interface CreateGuestPort {

  Guest save(Guest guest);
}
