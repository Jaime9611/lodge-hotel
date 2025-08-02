package com.lodge.lodge_hotel_restapi.application.services;

import com.lodge.lodge_hotel_restapi.domain.Cabin;

public interface CabinService {
   Cabin get(Long id);

    Long save(Cabin cabin);
}
