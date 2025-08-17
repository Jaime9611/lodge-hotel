package com.lodge.lodge_hotel_restapi.persistence.entities.mappers;

import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import org.springframework.data.domain.Page;

public interface PageMapper {
  <T> PageResponse<T> pagetoPageResponse(Page<T> page);
}
