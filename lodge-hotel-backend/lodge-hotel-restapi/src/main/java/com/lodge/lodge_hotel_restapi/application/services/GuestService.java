package com.lodge.lodge_hotel_restapi.application.services;

import com.lodge.lodge_hotel_restapi.domain.Guest;

public interface GuestService {

  Guest get(Long id);

  void delete(Long id);

  void update(Long id, Guest guest);

  Long save(Guest guest);
}
