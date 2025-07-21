package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CabinServiceImpl implements CabinService {

    private final ReadCabinPort readCabinPort;

    @Override
    public Cabin get(Long id) {
        return readCabinPort.get(id);
    }

    @Override
    public void save(Cabin cabin) {

    }
}
