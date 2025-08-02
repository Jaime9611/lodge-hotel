package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.ports.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CabinServiceImpl implements CabinService {

  private final ReadCabinPort readCabinPort;
  private final CreateCabinPort createCabinPort;

  @Override
  public Cabin get(Long id) {
    Optional<Cabin> result = readCabinPort.get(id);

    return result.orElse(null);
  }

  @Override
  public Long save(Cabin cabin) {
    Cabin savedCabin = createCabinPort.save(cabin);

    return savedCabin.getId();
  }

}
