package com.lodge.lodge_hotel_restapi.persistence.entities.mappers;

import com.lodge.lodge_hotel_restapi.domain.Guest;
import com.lodge.lodge_hotel_restapi.persistence.entities.GuestEntity;

public interface GuestMapper {

  GuestEntity guestToGuestEntity(Guest guest);

  Guest guestEntityToGuest(GuestEntity entity);

}
