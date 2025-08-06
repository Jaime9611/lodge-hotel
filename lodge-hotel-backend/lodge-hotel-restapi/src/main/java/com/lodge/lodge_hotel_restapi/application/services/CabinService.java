package com.lodge.lodge_hotel_restapi.application.services;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import java.util.List;

public interface CabinService {

  List<Cabin> getAll();

  Cabin get(Long id);

  void delete(Long id);

  void update(Long id, Cabin cabin);

  Long save(Cabin cabin);
}
