package com.lodge.lodge_hotel_restapi.application.ports;

import com.lodge.lodge_hotel_restapi.domain.Cabin;

import java.util.List;

public interface ReadCabinPort {
    Cabin get(Long id);

    List<Cabin> getAll();
}
