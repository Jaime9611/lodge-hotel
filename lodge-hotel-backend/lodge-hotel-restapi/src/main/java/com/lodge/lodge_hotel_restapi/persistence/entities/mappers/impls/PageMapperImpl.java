package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class PageMapperImpl implements PageMapper {

  @Override
  public <T> PageResponse<T> pagetoPageResponse(Page<T> page) {
    if (page == null) {
      return null;
    }

    PageResponse.PageResponseBuilder<T> dto = PageResponse.builder();

    dto.content(page.getContent());
    dto.totalPages(page.getTotalPages());
    dto.first(page.isFirst());
    dto.last(page.isLast());
    dto.empty(page.isEmpty());
    dto.number(page.getNumber());
    dto.numberOfElements(page.getNumberOfElements());
    dto.totalElements(page.getTotalElements());
    dto.size(page.getSize());

    return dto.build();
  }
}
