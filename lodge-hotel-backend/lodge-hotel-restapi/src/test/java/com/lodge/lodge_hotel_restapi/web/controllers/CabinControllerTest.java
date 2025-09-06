package com.lodge.lodge_hotel_restapi.web.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lodge.lodge_hotel_restapi.application.ports.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.DeleteCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.UpdateCabinPort;
import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.application.services.impls.CabinServiceImpl;
import com.lodge.lodge_hotel_restapi.config.KeyStoreConfig;
import com.lodge.lodge_hotel_restapi.config.SecurityConfig;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.factories.CabinFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;


@WebMvcTest(CabinController.class)
@Import({SecurityConfig.class, KeyStoreConfig.class})
class CabinControllerTest {

  @Autowired
  MockMvc mockMvc;

  @Autowired
  ObjectMapper objectMapper;

  @Mock
  ReadCabinPort readPort;

  @Mock
  CreateCabinPort createPort;

  @Mock
  DeleteCabinPort deletePort;

  @Mock
  UpdateCabinPort updatePort;

  @Captor
  ArgumentCaptor<Long> idArgumentCaptor;

  @Captor
  ArgumentCaptor<Cabin> cabinArgumentCaptor;

  @Mock
  PageMapper pageMapper;

  @MockitoBean
  CabinService cabinService;

  CabinServiceImpl cabinServiceImpl;

  @BeforeEach
  void setUp() {
    cabinServiceImpl = new CabinServiceImpl(readPort, createPort, deletePort, updatePort,
        pageMapper);
  }

  @Test
  @WithMockUser(username = "testuser", authorities = {"ROLE_USER"})
  void testGetCabins() throws Exception {
    // Arrange
    List<Cabin> testCabins = CabinFactory.createCabinList(2);

    long totalElements = 2;
    PageResponse.PageResponseBuilder<Cabin> pageResponse = PageResponse.builder();

    given(cabinService.getAll(null, null, null)).willReturn(
        pageResponse.content(testCabins).totalElements(totalElements).build());

    // Assert
    mockMvc.perform(get(Endpoints.CABIN).accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").isArray())
        .andExpect(jsonPath("$.totalElements").value(2));
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {"ROLE_USER"})
  void testGetCabinById() throws Exception {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    given(cabinService.get(testCabin.getId())).willReturn(testCabin);

    // Assert
    mockMvc.perform(get("/api/v1/cabin/{id}", testCabin.getId())
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {"ROLE_USER"})
  void testUpdateCabin() throws Exception {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    // Assert
    mockMvc.perform(put("/api/v1/cabin/{id}", testCabin.getId())
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(testCabin)))
        .andExpect(status().isNoContent());

    verify(cabinService, times(1)).update(idArgumentCaptor.capture(),
        cabinArgumentCaptor.capture());
    assertThat(idArgumentCaptor.getValue()).isEqualTo(testCabin.getId());
    assertThat(cabinArgumentCaptor.getValue().getName()).isEqualTo(testCabin.getName());
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {"ROLE_USER"})
  void testCreateCabin() throws Exception {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    given(cabinService.save(any(Cabin.class))).willReturn(testCabin.getId());

    // Assert
    testCabin.setId(null);
    mockMvc.perform(post("/api/v1/cabin")
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(testCabin)))
        .andExpect(status().isCreated())
        .andExpect(header().exists("Location"));
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {"ROLE_ADMIN"})
  void testCreateCabinInvalidRole() throws Exception {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    given(cabinService.save(any(Cabin.class))).willReturn(testCabin.getId());

    // Assert
    testCabin.setId(null);
    mockMvc.perform(post("/api/v1/cabin")
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(testCabin)))
        .andExpect(status().isForbidden());
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {"ROLE_USER"})
  void testDeleteCabin() throws Exception {
    // Arrange
    Cabin testCabin = CabinFactory.createSingleCabin();

    // Assert
    mockMvc.perform(delete("/api/v1/cabin/{id}", testCabin.getId()))
        .andExpect(status().isNoContent());

    verify(cabinService, times(1)).delete(idArgumentCaptor.capture());
    assertThat(idArgumentCaptor.getValue()).isEqualTo(testCabin.getId());
  }
}