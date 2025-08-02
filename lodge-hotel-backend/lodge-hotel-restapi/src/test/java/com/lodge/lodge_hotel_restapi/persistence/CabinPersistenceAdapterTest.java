package com.lodge.lodge_hotel_restapi.persistence;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls.CabinMapperImpl;
import com.lodge.lodge_hotel_restapi.persistence.repositories.CabinRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


class CabinPersistenceAdapterTest {

  @Mock
  CabinRepository cabinRepository;

  @InjectMocks
  CabinPersistenceAdapter persistenceAdapter;


  private static final Long TEST_ID = 1L;
  private static final String TEST_NAME = "Test-Cabin";
  private static final BigDecimal TEST_PRICE = BigDecimal.valueOf(100);

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    persistenceAdapter = new CabinPersistenceAdapter(cabinRepository, new CabinMapperImpl());
  }

  @Test
  void testGetCabinList() {
    // Arrange
    CabinEntity cabin1 = CabinEntity.builder()
        .id(2L)
        .name("Cabin 1")
        .price(BigDecimal.valueOf(300))
        .build();

    CabinEntity cabin2 = CabinEntity.builder()
        .id(3L)
        .name("Cabin 2")
        .price(BigDecimal.valueOf(400))
        .build();

    List<CabinEntity> testCabins = List.of(cabin1, cabin2);

    given(cabinRepository.findAll()).willReturn(testCabins);

    // Act
    List<Cabin> foundCabins = persistenceAdapter.getAll();

    // Assert
    assertThat(foundCabins.size()).isEqualTo(2);
    assertThat(foundCabins.get(0).getId()).isEqualTo(cabin1.getId());
    assertThat(foundCabins.get(0).getName()).isEqualTo(cabin1.getName());
    assertThat(foundCabins.get(0).getPrice().toString()).isEqualTo(cabin1.getPrice().toString());
    assertThat(foundCabins.get(1).getId()).isEqualTo(cabin2.getId());
    assertThat(foundCabins.get(1).getName()).isEqualTo(cabin2.getName());
    assertThat(foundCabins.get(1).getPrice().toString()).isEqualTo(cabin2.getPrice().toString());
  }

  @Test
  void testGetById() {
    Cabin testCabin = Cabin.builder().id(TEST_ID).name(TEST_NAME)
        .price(TEST_PRICE).build();

    CabinEntity testEntity = CabinEntity.builder().name(TEST_NAME)
        .price(TEST_PRICE).build();

    given(cabinRepository.findById(TEST_ID)).willReturn(Optional.of(testEntity));

    Optional<Cabin> foundCabin = persistenceAdapter.get(TEST_ID);

    assertThat(foundCabin.isPresent()).isTrue();
    assertThat(foundCabin.get().getName()).isEqualTo(TEST_NAME);
  }

  @Test
  void testGetByIdNotFound() {
    // Arrange
    Cabin testCabin = Cabin.builder().id(TEST_ID).name(TEST_NAME)
        .price(TEST_PRICE).build();

    given(cabinRepository.findById(TEST_ID)).willReturn(Optional.empty());

    // Act
    Optional<Cabin> foundCabin = persistenceAdapter.get(TEST_ID);

    // Assert
    assertThat(foundCabin.isEmpty()).isTrue();
  }

  @Test
  void testSaveCabin() {
    //  Arrange
    Cabin testCabin = Cabin.builder().name("Test-cabin")
        .price(BigDecimal.valueOf(100)).build();

    given(cabinRepository.save(any(CabinEntity.class))).willReturn(CabinEntity.builder().build());

    // Act
    Cabin savedCabin = persistenceAdapter.save(testCabin);

    // Assert
    assertThat(savedCabin.getName()).isNull();
    assertThat(savedCabin.getPrice()).isNull();
  }

  @Test
  void testDeleteCabin() {
    // Arrange
    given(cabinRepository.findById(TEST_ID)).willReturn(
        Optional.ofNullable(CabinEntity.builder().name(TEST_NAME).build()));
    // Act
    persistenceAdapter.delete(TEST_ID);

    // Assert
    verify(cabinRepository).deleteById(TEST_ID);
  }
}