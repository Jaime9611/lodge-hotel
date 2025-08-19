package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.ports.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.DeleteCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.UpdateCabinPort;
import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import com.lodge.lodge_hotel_restapi.web.validations.exceptions.ItemNotFoundException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CabinServiceImpl implements CabinService {

  private final ReadCabinPort readCabinPort;
  private final CreateCabinPort createCabinPort;
  private final DeleteCabinPort deleteCabinPort;
  private final UpdateCabinPort updateCabinPort;
  private final PageMapper pageMapper;

  private static final int DEFAULT_PAGE = 0;
  private static final int DEFAULT_PAGE_SIZE = 25;
  private static final int PAGE_MAX_SIZE = 500;



  @Override
  public PageResponse<Cabin> getAll(String cabinName, Integer pageNumber, Integer pageSize) {
    log.debug("{} - Get all cabins was called.", CabinService.class.getSimpleName());

    PageRequest pageRequest = buildPageRequest(pageNumber, pageSize);

    PageResponse<Cabin> cabinPageResponse;

    Page<Cabin> cabinPage = readCabinPort.getAll(pageRequest);
    cabinPageResponse = pageMapper.pagetoPageResponse(cabinPage);

    return cabinPageResponse;
  }

  @Override
  public Cabin get(Long id) {
    log.debug("{} - Get by id was called with {}", CabinService.class.getSimpleName(),
        String.valueOf(id));

    Optional<Cabin> result = readCabinPort.get(id);

    return result.orElse(null);
  }

  @Override
  public void delete(Long id) {
    log.debug("{} - Delete by id was called with {}", CabinService.class.getSimpleName(),
        String.valueOf(id));

    Cabin foundCabin = findByCabinId(id);

    deleteCabinPort.delete(foundCabin.getId());
  }

  @Override
  public void update(Long id, Cabin cabin) {
    log.debug("{} - Update was called with {}", CabinService.class.getSimpleName(),
        String.valueOf(id));

    Cabin foundCabin = findByCabinId(id);

    foundCabin.setName(cabin.getName());
    foundCabin.setRegularPrice(cabin.getRegularPrice());

    updateCabinPort.update(foundCabin);
  }

  @Override
  public Long save(Cabin cabin) {
    log.debug("{} - Save was called with {}", CabinService.class.getSimpleName(),
        cabin.getName());

    Cabin savedCabin = createCabinPort.save(cabin);

    return savedCabin.getId();
  }

  private Cabin findByCabinId(Long id) {
    log.debug("{} - FinById was called with {}", CabinService.class.getSimpleName(),
        String.valueOf(id));

    return readCabinPort.get(id)
        .orElseThrow(() -> new ItemNotFoundException("Cabin with provided ID not found."));
  }

  private PageRequest buildPageRequest(Integer pageNumber, Integer pageSize) {
    int queryPageNumber;
    int queryPageSize;

    if (pageNumber != null && pageNumber > 0) {
      queryPageNumber = pageNumber - 1;
    } else {
      queryPageNumber = DEFAULT_PAGE;
    }

    if (pageSize == null) {
      queryPageSize = DEFAULT_PAGE_SIZE;
    } else {
      if (pageSize > 500) {
        queryPageSize = PAGE_MAX_SIZE;
      } else {
        queryPageSize = pageSize;
      }
    }

    Sort sort = Sort.by(Sort.Order.asc("id"));

    return PageRequest.of(queryPageNumber, queryPageSize, sort);
  }
}
