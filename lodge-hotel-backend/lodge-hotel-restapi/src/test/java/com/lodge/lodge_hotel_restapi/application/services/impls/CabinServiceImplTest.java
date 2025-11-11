package com.lodge.lodge_hotel_restapi.application.services.impls;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.lodge.lodge_hotel_restapi.application.ports.cabin.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.cabin.DeleteCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.cabin.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.cabin.UpdateCabinPort;
import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.factories.CabinFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

class CabinServiceImplTest {

  @Mock
  ReadCabinPort readPort;

  @Mock
  CreateCabinPort createPort;

  @Mock
  DeleteCabinPort deletePort;

  @Mock
  UpdateCabinPort updatePort;

  @Mock
  PageMapper pageMapper;

  @Captor
  ArgumentCaptor<Long> idArgumentCaptor;

  @Captor
  ArgumentCaptor<Cabin> cabinArgumentCaptor;

  CabinService service;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    service = new CabinServiceImpl(readPort, createPort, deletePort, updatePort, pageMapper);
  }

  @Test
  void testUpdateCabin() {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();
    given(readPort.get(testCabin.getId())).willReturn(Optional.ofNullable(Cabin.builder().id(
        testCabin.getId()).build()));

    // Act
    service.update(testCabin.getId(), testCabin);

    // Assert
    verify(readPort, times(1)).get(testCabin.getId());
    verify(updatePort).update(cabinArgumentCaptor.capture());
    assertThat(cabinArgumentCaptor.getValue().getId()).isEqualTo(testCabin.getId());
    assertThat(cabinArgumentCaptor.getValue().getName()).isEqualTo(testCabin.getName());
    assertThat(cabinArgumentCaptor.getValue().getRegularPrice()).isEqualTo(testCabin.getRegularPrice());
  }

  @Test
  void testDeleteCabin() {
    // Arrange
    given(readPort.get(anyLong())).willReturn(
        Optional.ofNullable(Cabin.builder().id(CabinFactory.TEST_ID).build()));

    // Act
    service.delete(CabinFactory.TEST_ID);

    // Assert
    verify(readPort, times(1)).get(anyLong());
    verify(deletePort).delete(idArgumentCaptor.capture());
    assertThat(idArgumentCaptor.getValue()).isEqualTo(CabinFactory.TEST_ID);
  }

  @Test
  void testGetCabinList() {
    // Arrange
    List<Cabin> testCabinList = CabinFactory.createCabinList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<Cabin> testPage = new PageImpl<>(testCabinList, pageable, totalElements );
    PageResponse.PageResponseBuilder<Cabin> pageResponse = PageResponse.builder();

    given(readPort.getAll(any(PageRequest.class))).willReturn(testPage);
    given(pageMapper.pagetoPageResponse(any(Page.class))).willReturn(pageResponse.content(testCabinList).build());

    // Act
    PageResponse<Cabin> foundCabins = service.getAll("test", 1, 5);

    // Assert
    assertThat(foundCabins.getContent().get(0).getName()).isEqualTo(testCabinList.get(0).getName());
    assertThat(foundCabins.getContent().get(1).getName()).isEqualTo(testCabinList.get(1).getName());
  }

  @Test
  void testGetCabinListWithDefaults() {
    // Arrange
    List<Cabin> testCabinList = CabinFactory.createCabinList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<Cabin> testPage = new PageImpl<>(testCabinList, pageable, totalElements );
    PageResponse.PageResponseBuilder<Cabin> pageResponse = PageResponse.builder();

    given(readPort.getAll(any(PageRequest.class))).willReturn(testPage);
    given(pageMapper.pagetoPageResponse(any(Page.class))).willReturn(pageResponse.content(testCabinList).build());

    // Act
    PageResponse<Cabin> foundCabins = service.getAll("test", null, null);

    // Assert
    assertThat(foundCabins.getContent().get(0).getName()).isEqualTo(testCabinList.get(0).getName());
    assertThat(foundCabins.getContent().get(1).getName()).isEqualTo(testCabinList.get(1).getName());
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

    given(createPort.save(any(Cabin.class))).willReturn(
        Cabin.builder().id(testCabin.getId()).build());

    // Act
    Long savedCabinId = service.save(testCabin);

    // Assert
    verify(createPort, times(1)).save(any(Cabin.class));
    assertThat(savedCabinId).isEqualTo(testCabin.getId());
  }
}