package com.lodge.lodge_hotel_restapi.application.services;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;

public interface CabinService {

  public PageResponse<Cabin> getAll(String cabinName, Integer pageNumber, Integer pageSize);

  Cabin get(Long id);

  String getCabinImage(Long id);

  void delete(Long id);

  void update(Long id, Cabin cabin);

  Long save(Cabin cabin);
}
