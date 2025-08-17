package com.lodge.lodge_hotel_restapi.persistence;

import com.lodge.lodge_hotel_restapi.application.ports.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.DeleteCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.UpdateCabinPort;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.CabinMapper;
import com.lodge.lodge_hotel_restapi.persistence.repositories.CabinRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CabinPersistenceAdapter implements CreateCabinPort, ReadCabinPort, UpdateCabinPort,
    DeleteCabinPort {

  private final CabinRepository cabinRepository;
  private final CabinMapper cabinMapper;

  @Override
  public Optional<Cabin> get(Long id) {
    Optional<CabinEntity> foundCabinEntity = cabinRepository.findById(id);

    return foundCabinEntity.map(cabinMapper::cabinEntityToCabin);
  }

  @Override
  public Page<Cabin> getAll(PageRequest pageRequest) {

    Page<CabinEntity> foundCabins = cabinRepository.findAll(pageRequest);

    return foundCabins.map(cabinMapper::cabinEntityToCabin);
  }

  @Override
  public Cabin save(Cabin cabin) {
    CabinEntity newCabin = cabinMapper.cabinToCabinEntity(cabin);

    return cabinMapper.cabinEntityToCabin(cabinRepository.save(newCabin));
  }

  @Override
  public void delete(Long id) {
    cabinRepository.deleteById(id);
  }

  @Override
  public void update(Cabin cabin) {
    cabinRepository.save(cabinMapper.cabinToCabinEntity(cabin));
  }
}
