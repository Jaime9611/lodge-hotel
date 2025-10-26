package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.ports.guest.CreateGuestPort;
import com.lodge.lodge_hotel_restapi.application.services.GuestService;
import com.lodge.lodge_hotel_restapi.domain.Guest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GuestServiceImpl implements GuestService {

  private CreateGuestPort createGuestPort;

  @Override
  public Guest get(Long id) {
    return null;
  }

  @Override
  public void delete(Long id) {

  }

  @Override
  public void update(Long id, Guest guest) {

  }

  @Override
  public Long save(Guest guest) {
    log.debug("{} - Save was called with {}", GuestService.class.getSimpleName(),
        guest.getFullName());

    Guest savedGuest = createGuestPort.save(guest);

    return savedGuest.getId();
  }
}
