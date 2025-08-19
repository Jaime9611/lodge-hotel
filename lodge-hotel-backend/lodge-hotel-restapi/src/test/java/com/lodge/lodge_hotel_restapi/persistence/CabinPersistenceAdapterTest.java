package com.lodge.lodge_hotel_restapi.persistence;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.factories.CabinFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls.CabinMapperImpl;
import com.lodge.lodge_hotel_restapi.persistence.repositories.CabinRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


class CabinPersistenceAdapterTest {

  @Mock
  CabinRepository cabinRepository;

  CabinPersistenceAdapter persistenceAdapter;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    persistenceAdapter = new CabinPersistenceAdapter(cabinRepository, new CabinMapperImpl());
  }

  @Test
  void testGetCabinList() {
    // Arrange
    List<CabinEntity> testCabins = CabinFactory.createCabinEntityList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<CabinEntity> testPage = new PageImpl<>(testCabins, pageable, totalElements );

    given(cabinRepository.findAll(any(PageRequest.class))).willReturn(testPage);

    // Act
    Page<Cabin> foundCabins = persistenceAdapter.getAll(PageRequest.of(0, 1));

    // Assert
    assertThat(foundCabins.getTotalElements()).isEqualTo(2);
    assertThat(foundCabins.getContent().get(0).getId()).isEqualTo(testCabins.get(0).getId());
    assertThat(foundCabins.getContent().get(0).getName()).isEqualTo(testCabins.get(0).getName());
    assertThat(foundCabins.getContent().get(0).getRegularPrice().toString()).isEqualTo(
        testCabins.get(0).getRegularPrice().toString());
    assertThat(foundCabins.getContent().get(1).getId()).isEqualTo(testCabins.get(1).getId());
    assertThat(foundCabins.getContent().get(1).getName()).isEqualTo(testCabins.get(1).getName());
    assertThat(foundCabins.getContent().get(1).getRegularPrice().toString()).isEqualTo(
        testCabins.get(1).getRegularPrice().toString());
  }

  @Test
  void testGetById() {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    CabinEntity testEntity = CabinFactory.createSingleCabinEntity();

    given(cabinRepository.findById(CabinFactory.TEST_ID)).willReturn(Optional.of(testEntity));

    // Act
    Optional<Cabin> foundCabin = persistenceAdapter.get(CabinFactory.TEST_ID);

    // Assert
    assertThat(foundCabin.isPresent()).isTrue();
    assertThat(foundCabin.get().getName()).isEqualTo(testEntity.getName());
  }

  @Test
  void testGetByIdNotFound() {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    given(cabinRepository.findById(CabinFactory.TEST_ID)).willReturn(Optional.empty());

    // Act
    Optional<Cabin> foundCabin = persistenceAdapter.get(CabinFactory.TEST_ID);

    // Assert
    assertThat(foundCabin.isEmpty()).isTrue();
  }

  @Test
  void testSaveCabin() {
    //  Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    given(cabinRepository.save(any(CabinEntity.class))).willReturn(
        CabinEntity.builder().id(testCabin.getId())
            .name(testCabin.getName())
            .regularPrice(testCabin.getRegularPrice()).build());

    // Act
    testCabin.setId(null);
    Cabin savedCabin = persistenceAdapter.save(testCabin);

    // Assert
    verify(cabinRepository, times(1)).save(any(CabinEntity.class));
    assertThat(savedCabin.getId()).isNotNull();
    assertThat(savedCabin.getName()).isEqualTo(testCabin.getName());
    assertThat(savedCabin.getRegularPrice()).isEqualTo(testCabin.getRegularPrice());
  }

  @Test
  void testDeleteCabin() {
    // Arrange
    ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);

    // Act
    persistenceAdapter.delete(CabinFactory.TEST_ID);

    // Assert
    verify(cabinRepository).deleteById(idArgumentCaptor.capture());
    assertThat(idArgumentCaptor.getValue()).isEqualTo(CabinFactory.TEST_ID);
  }

  @Test
  void testUpdateCabin() {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();
    ArgumentCaptor<CabinEntity> cabinArgumentCaptor = ArgumentCaptor.forClass(CabinEntity.class);

    // Act
    persistenceAdapter.update(testCabin);

    // Assert
    verify(cabinRepository).save(cabinArgumentCaptor.capture());

    assertThat(cabinArgumentCaptor.getValue().getId()).isEqualTo(testCabin.getId());
    assertThat(cabinArgumentCaptor.getValue().getName()).isEqualTo(testCabin.getName());
    assertThat(cabinArgumentCaptor.getValue().getRegularPrice()).isEqualTo(testCabin.getRegularPrice());
  }
}