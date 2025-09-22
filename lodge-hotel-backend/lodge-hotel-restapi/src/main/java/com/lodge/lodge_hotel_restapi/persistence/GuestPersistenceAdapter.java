package com.lodge.lodge_hotel_restapi.persistence;

import com.lodge.lodge_hotel_restapi.application.ports.guest.CreateGuestPort;
import com.lodge.lodge_hotel_restapi.application.ports.guest.DeleteGuestPort;
import com.lodge.lodge_hotel_restapi.application.ports.guest.ReadGuestPort;
import com.lodge.lodge_hotel_restapi.application.ports.guest.UpdateGuestPort;
import com.lodge.lodge_hotel_restapi.domain.Guest;
import com.lodge.lodge_hotel_restapi.persistence.entities.GuestEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.GuestMapper;
import com.lodge.lodge_hotel_restapi.persistence.repositories.GuestRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GuestPersistenceAdapter implements CreateGuestPort, ReadGuestPort, UpdateGuestPort,
    DeleteGuestPort {

  private final GuestRepository guestRepository;
  private final GuestMapper guestMapper;

  @Override
  public Guest save(Guest guest) {
    GuestEntity newGuest = guestMapper.guestToGuestEntity(guest);

    return guestMapper.guestEntityToGuest(guestRepository.save(newGuest));
  }

  @Override
  public void delete(Long id) {
    guestRepository.deleteById(id);
  }

  @Override
  public Optional<Guest> get(Long id) {
    Optional<GuestEntity> foundGuestEntity = guestRepository.findById(id);

    return foundGuestEntity.map(guestMapper::guestEntityToGuest);
  }

  @Override
  public void update(Guest guest) {
    guestRepository.save(guestMapper.guestToGuestEntity(guest));
  }
}
