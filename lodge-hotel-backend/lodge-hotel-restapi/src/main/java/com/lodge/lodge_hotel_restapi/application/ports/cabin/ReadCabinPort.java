package com.lodge.lodge_hotel_restapi.application.ports.cabin;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ReadCabinPort {

  Optional<Cabin> get(Long id);

  Page<Cabin> getAll(PageRequest pageRequest);

  List<Cabin> getByCapacityBetween(int min, int max);
}
