package com.lodge.lodge_hotel_restapi.persistence;

import com.lodge.lodge_hotel_restapi.application.ports.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.DeleteCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.UpdateCabinPort;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.CabinMapper;
import com.lodge.lodge_hotel_restapi.persistence.repositories.CabinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CabinPersistenceAdapter implements CreateCabinPort, ReadCabinPort, UpdateCabinPort, DeleteCabinPort {

    private final CabinRepository cabinRepository;
    private final CabinMapper cabinMapper;

    @Override
    public Cabin get(Long id) {
        Optional<CabinEntity> foundCabinEntity = cabinRepository.findById(id);

        if(foundCabinEntity.isPresent()) {
            return cabinMapper.cabinEntityToCabin(foundCabinEntity.get());
        }

        return Cabin.builder().build();
    }

    @Override
    public List<Cabin> getAll() {
        return List.of();
    }

    @Override
    public Cabin save(Cabin cabin) {
        return Cabin.builder().build();
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void update(Cabin cabin) {

    }
}
