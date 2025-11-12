package com.lodge.lodge_hotel_restapi.application.services;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import java.util.List;

public interface CabinService {

  PageResponse<Cabin> getAll(String sortBy, String direction, Integer pageNumber, Integer pageSize);

  List<Cabin> getByCapacityBetween(int minValue, int maxValue);

  Cabin get(Long id);

  void delete(Long id);

  void update(Long id, Cabin cabin);

  Long save(Cabin cabin);
}
