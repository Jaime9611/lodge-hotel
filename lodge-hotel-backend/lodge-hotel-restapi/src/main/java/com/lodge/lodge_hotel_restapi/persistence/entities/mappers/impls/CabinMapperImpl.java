package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.CabinMapper;
import org.springframework.stereotype.Component;

@Component
public class CabinMapperImpl implements CabinMapper {
    @Override
    public CabinEntity cabinToCabinEntity(Cabin cabin) {
        return null;
    }

    @Override
    public Cabin cabinEntityToCabin(CabinEntity entity) {
        if (entity == null) {
            return null;
        }

        Cabin.CabinBuilder cabin = Cabin.builder();
        cabin.id(entity.getId());
        cabin.name(entity.getName());
        cabin.price(entity.getPrice());

        return cabin.build();
    }
}
