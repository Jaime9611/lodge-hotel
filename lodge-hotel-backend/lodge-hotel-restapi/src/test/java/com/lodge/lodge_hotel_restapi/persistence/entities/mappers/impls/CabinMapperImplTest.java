package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.factories.CabinFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.CabinMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CabinMapperImplTest {

  CabinMapper cabinMapper;

  @BeforeEach
  void setUp() {
    cabinMapper = new CabinMapperImpl();
  }

  @Test
  void testNullEntityReturnsNull() {
    assertThat(cabinMapper.cabinEntityToCabin(null)).isNull();
  }

  @Test
  void testEntityToDomain() {
    // Arrange
    CabinEntity entity = CabinFactory.createSingleCabinEntity();

    // Act
    Cabin domainResult = cabinMapper.cabinEntityToCabin(entity);

    // Assert
    assertThat(domainResult.getId()).isEqualTo(entity.getId());
    assertThat(domainResult.getName()).isEqualTo(entity.getName());
    assertThat(domainResult.getRegularPrice()).isEqualTo(entity.getRegularPrice());
  }

  @Test
  void testNullDomainReturnsNull() {
    assertThat(cabinMapper.cabinToCabinEntity(null)).isNull();
  }

  @Test
  void testDomainToEntity() {
    // Arrange
    Cabin domain = CabinFactory.createSingleCabin();

    // Act
    CabinEntity entityResult = cabinMapper.cabinToCabinEntity(domain);

    // Assert
    assertThat(entityResult.getId()).isEqualTo(domain.getId());
    assertThat(entityResult.getName()).isEqualTo(domain.getName());
  }
}