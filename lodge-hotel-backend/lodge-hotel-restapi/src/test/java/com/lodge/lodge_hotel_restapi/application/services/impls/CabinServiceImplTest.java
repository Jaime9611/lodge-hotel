package com.lodge.lodge_hotel_restapi.application.services.impls;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.lodge.lodge_hotel_restapi.application.ports.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.factories.CabinFactory;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class CabinServiceImplTest {

  @Mock
  ReadCabinPort readPort;

  @Mock
  CreateCabinPort createPort;

  @Captor
  ArgumentCaptor<Long> idArgumentCaptor;

  CabinService service;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    service = new CabinServiceImpl(readPort, createPort);
  }

  @Test
  void testGetCabin() {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    given(readPort.get(testCabin.getId())).willReturn(Optional.of(testCabin));

    // Act
    Cabin foundCabin = service.get(testCabin.getId());

    // Assert
    assertThat(foundCabin.getId()).isEqualTo(testCabin.getId());
    assertThat(foundCabin.getName()).isEqualTo(testCabin.getName());
  }

  @Test
  void testSaveCabin() {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    given(createPort.save(any(Cabin.class))).willReturn(Cabin.builder().id(testCabin.getId()).build());

    // Act
    Long savedCabinId = service.save(testCabin);

    // Assert
    assertThat(savedCabinId).isEqualTo(testCabin.getId());
  }
}