package com.lodge.lodge_hotel_restapi.application.ports;

import com.lodge.lodge_hotel_restapi.domain.Cabin;

public interface CreateCabinPort {
    void save(Cabin cabin);
}
