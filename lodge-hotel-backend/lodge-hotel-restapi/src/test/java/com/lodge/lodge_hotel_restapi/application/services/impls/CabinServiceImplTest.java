package com.lodge.lodge_hotel_restapi.application.services.impls;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.lodge.lodge_hotel_restapi.application.ports.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import java.math.BigDecimal;
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

  private static final Long TEST_ID = 1L;
  private static final String TEST_NAME = "Test-Cabin";
  private static final BigDecimal TEST_PRICE = BigDecimal.valueOf(100);

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    service = new CabinServiceImpl(readPort, createPort);
  }

  @Test
  void testGetCabin() {
    // Arrange
    Cabin testCabin = Cabin.builder()
        .id(TEST_ID)
        .name(TEST_NAME)
        .price(TEST_PRICE)
        .build();

    given(readPort.get(TEST_ID)).willReturn(Optional.ofNullable(testCabin));

    // Act
    Cabin foundCabin = service.get(TEST_ID);

    // Assert
    assertThat(foundCabin.getId()).isEqualTo(TEST_ID);
    assertThat(foundCabin.getName()).isEqualTo(TEST_NAME);
  }

  @Test
  void testSaveCabin() {
    // Arrange
    Cabin testCabin = Cabin.builder()
        .name(TEST_NAME)
        .price(TEST_PRICE)
        .build();

    given(createPort.save(any(Cabin.class))).willReturn(Cabin.builder().id(TEST_ID).build());

    // Act
    Long savedCabinId = service.save(testCabin);

    // Assert
    assertThat(savedCabinId).isEqualTo(TEST_ID);
  }
}