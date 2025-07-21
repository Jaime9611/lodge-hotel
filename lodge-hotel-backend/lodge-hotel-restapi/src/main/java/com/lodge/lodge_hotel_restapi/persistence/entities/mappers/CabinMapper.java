package com.lodge.lodge_hotel_restapi.persistence.entities.mappers;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;

public interface CabinMapper {
    CabinEntity cabinToCabinEntity(Cabin cabin);
    Cabin cabinEntityToCabin(CabinEntity entity);
}
