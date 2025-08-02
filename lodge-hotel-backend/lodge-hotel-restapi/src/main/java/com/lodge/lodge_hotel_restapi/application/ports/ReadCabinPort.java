package com.lodge.lodge_hotel_restapi.application.ports;

import com.lodge.lodge_hotel_restapi.domain.Cabin;

import java.util.List;
import java.util.Optional;

public interface ReadCabinPort {
    Optional<Cabin> get(Long id);

    List<Cabin> getAll();
}
