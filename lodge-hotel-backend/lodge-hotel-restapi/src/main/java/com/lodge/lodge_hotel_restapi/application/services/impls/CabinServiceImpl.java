package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.ports.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.DeleteCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.UpdateCabinPort;
import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.web.validations.exceptions.ItemNotFoundException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CabinServiceImpl implements CabinService {

  private final ReadCabinPort readCabinPort;
  private final CreateCabinPort createCabinPort;
  private final DeleteCabinPort deleteCabinPort;
  private final UpdateCabinPort updateCabinPort;


  @Override
  public List<Cabin> getAll() {
    log.debug("{} - Get all cabins was called.", CabinService.class.getSimpleName());

    return readCabinPort.getAll();
  }

  @Override
  public Cabin get(Long id) {
    log.debug("{} - Get by id was called with {}", CabinService.class.getSimpleName(),
        String.valueOf(id));

    Optional<Cabin> result = readCabinPort.get(id);

    return result.orElse(null);
  }

  @Override
  public void delete(Long id) {
    log.debug("{} - Delete by id was called with {}", CabinService.class.getSimpleName(),
        String.valueOf(id));

    Cabin foundCabin = findByCabinId(id);

    deleteCabinPort.delete(foundCabin.getId());
  }

  @Override
  public void update(Long id, Cabin cabin) {
    log.debug("{} - Update was called with {}", CabinService.class.getSimpleName(),
        String.valueOf(id));

    Cabin foundCabin = findByCabinId(id);

    foundCabin.setName(cabin.getName());
    foundCabin.setPrice(cabin.getPrice());

    updateCabinPort.update(foundCabin);
  }

  @Override
  public Long save(Cabin cabin) {
    log.debug("{} - Save was called with {}", CabinService.class.getSimpleName(),
        cabin.getName());

    Cabin savedCabin = createCabinPort.save(cabin);

    return savedCabin.getId();
  }

  private Cabin findByCabinId(Long id) {
    log.debug("{} - FinById was called with {}", CabinService.class.getSimpleName(),
        String.valueOf(id));

    return readCabinPort.get(id)
        .orElseThrow(() -> new ItemNotFoundException("Cabin with provided ID not found."));
  }
}
