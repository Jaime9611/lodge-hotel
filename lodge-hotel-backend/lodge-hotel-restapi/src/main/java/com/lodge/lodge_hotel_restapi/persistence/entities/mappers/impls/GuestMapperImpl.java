package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import com.lodge.lodge_hotel_restapi.domain.Guest;
import com.lodge.lodge_hotel_restapi.persistence.entities.GuestEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.GuestMapper;
import org.springframework.stereotype.Component;

@Component
public class GuestMapperImpl implements GuestMapper {

  @Override
  public GuestEntity guestToGuestEntity(Guest guest) {
    if (guest == null) {
      return null;
    }

    GuestEntity.GuestEntityBuilder entity = GuestEntity.builder();
    entity.id(guest.getId());
    entity.email(guest.getEmail());
    entity.country(guest.getCountry());
    entity.countryFlag(guest.getCountryFlag());
    entity.nationalId(guest.getNationalId());
    entity.fullName(guest.getFullName());

    return entity.build();
  }

  @Override
  public Guest guestEntityToGuest(GuestEntity entity) {
    if (entity == null) {
      return null;
    }

    Guest.GuestBuilder domain = Guest.builder();
    domain.id(entity.getId());
    domain.email(entity.getEmail());
    domain.country(entity.getCountry());
    domain.countryFlag(entity.getCountryFlag());
    domain.nationalId(entity.getNationalId());
    domain.fullName(entity.getFullName());

    return domain.build();
  }
}
