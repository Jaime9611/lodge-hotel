package com.lodge.lodge_hotel_restapi.factories;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.web.dtos.CabinSimpleDto;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.IntStream;

public class CabinFactory {

  public static final long TEST_ID = 1L;
  public static final String NAME = "Test Cabin";
  public static final int PRICE = 200;

  public static Cabin createSingleCabin(Long customId) {
    return Cabin.builder()
        .id(customId)
        .name(String.valueOf(NAME + customId))
        .regularPrice(BigDecimal.valueOf(PRICE))
        .build();
  }

  public static Cabin createSingleCabin() {
    return createSingleCabin(TEST_ID);
  }

  public static CabinEntity createSingleCabinEntity(Long customId) {
    return CabinEntity.builder()
        .id(customId)
        .name(String.valueOf(NAME + customId))
        .regularPrice(BigDecimal.valueOf(PRICE))
        .build();
  }

  public static CabinEntity createSingleCabinEntity() {
    return createSingleCabinEntity(TEST_ID);
  }

  public static CabinSimpleDto createSingleCabinSimpleDto(Long customId) {
    return CabinSimpleDto.builder()
        .id(customId)
        .name(String.valueOf(NAME + customId))
        .build();
  }

  public static CabinSimpleDto createSingleCabinSimpleDto() {
    return createSingleCabinSimpleDto(TEST_ID);
  }

  public static List<Cabin> createCabinList(int quantity) {
    return IntStream.range(0, quantity).mapToObj(i -> createSingleCabin((long) i)).toList();
  }

  public static List<CabinEntity> createCabinEntityList(int quantity) {
    return IntStream.range(0, quantity).mapToObj(i -> createSingleCabinEntity((long) i)).toList();
  }

  public static List<CabinSimpleDto> createCabinSimpleDtoList(int quantity) {
    return IntStream.range(0, quantity).mapToObj(i -> createSingleCabinSimpleDto((long) i)).toList();
  }
}
