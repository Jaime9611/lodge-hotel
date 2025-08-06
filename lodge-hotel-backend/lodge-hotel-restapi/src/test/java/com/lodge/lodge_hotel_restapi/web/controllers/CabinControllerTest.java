package com.lodge.lodge_hotel_restapi.web.controllers;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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

  @MockitoBean
  CabinService cabinService;

  CabinServiceImpl cabinServiceImpl;

  @BeforeEach
  void setUp() {
    cabinServiceImpl = new CabinServiceImpl(readPort, createPort, deletePort, updatePort);
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {"ROLE_ADMIN"})
  void testGetCabinById() throws Exception {
    Cabin testCabin = CabinFactory.createSingleCabin();

    given(cabinService.get(testCabin.getId())).willReturn(testCabin);

    mockMvc.perform(get("/api/v1/cabin/{id}", testCabin.getId())
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }
}