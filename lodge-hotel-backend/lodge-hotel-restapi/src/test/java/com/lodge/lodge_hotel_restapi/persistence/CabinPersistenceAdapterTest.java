package com.lodge.lodge_hotel_restapi.persistence;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.CabinMapper;
import com.lodge.lodge_hotel_restapi.persistence.repositories.CabinRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;


class CabinPersistenceAdapterTest {

  @Mock
  CabinRepository cabinRepository;

  @InjectMocks
  CabinPersistenceAdapter persistenceAdapter;

  @Mock
  CabinMapper cabinMapper;

  private static final Long TEST_ID = 1L;
  private static final String TEST_NAME = "Test-Cabin";
  private static final BigDecimal TEST_PRICE = BigDecimal.valueOf(100);

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }
  
  @Test
  void testGetById() {
    Cabin testCabin = Cabin.builder().id(TEST_ID).name(TEST_NAME)
        .price(TEST_PRICE).build();

    CabinEntity testEntity = CabinEntity.builder().name(TEST_NAME)
        .price(TEST_PRICE).build();

    given(cabinRepository.findById(TEST_ID)).willReturn(Optional.of(testEntity));
    given(cabinMapper.cabinEntityToCabin(any(CabinEntity.class))).willReturn(testCabin);

    Cabin foundCabin = persistenceAdapter.get(TEST_ID).get();

    assertThat(foundCabin.getName()).isEqualTo(TEST_NAME);
  }

  @Test
  void testGetByIdNotFound() {
    Cabin testCabin = Cabin.builder().id(TEST_ID).name(TEST_NAME)
        .price(TEST_PRICE).build();

    given(cabinRepository.findById(TEST_ID)).willReturn(Optional.empty());
    given(cabinMapper.cabinEntityToCabin(any(CabinEntity.class))).willReturn(testCabin);

    Optional<Cabin> foundCabin = persistenceAdapter.get(TEST_ID);

    assertThat(foundCabin.isEmpty()).isTrue();
  }

  @Test
  void testSaveCabin() {
    // Setup - Arrange
    Cabin testCabin = Cabin.builder().name("Test-cabin")
        .price(BigDecimal.valueOf(100)).build();

    given(cabinRepository.save(any(CabinEntity.class))).willReturn(CabinEntity.builder().build());

    Cabin savedCabin = persistenceAdapter.save(testCabin);

    // Assert
    assertThat(savedCabin.getName()).isNull();
    assertThat(savedCabin.getPrice()).isNull();

    //TODO: change this impl
  }

}