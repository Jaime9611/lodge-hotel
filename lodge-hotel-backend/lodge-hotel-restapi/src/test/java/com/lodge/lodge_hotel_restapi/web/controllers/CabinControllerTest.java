package com.lodge.lodge_hotel_restapi.web.controllers;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lodge.lodge_hotel_restapi.application.ports.CreateCabinPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadCabinPort;
import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.application.services.impls.CabinServiceImpl;
import com.lodge.lodge_hotel_restapi.config.KeyStoreConfig;
import com.lodge.lodge_hotel_restapi.config.SecurityConfig;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import java.math.BigDecimal;
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

  @MockitoBean
  CabinService cabinService;

  CabinServiceImpl cabinServiceImpl;

  @BeforeEach
  void setUp() {
    cabinServiceImpl = new CabinServiceImpl(readPort, createPort);
  }

  @Test
  @WithMockUser(username = "testUser", authorities = {"ROLE_ADMIN"})
  void testGetCabinById() throws Exception {
    Cabin testCabin = Cabin.builder().id(1L).name("Test_Cabin").price(BigDecimal.valueOf(350))
        .build();

    given(cabinService.get(1L)).willReturn(testCabin);

    mockMvc.perform(get("/api/v1/cabin/{id}", 1L)
            .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }
}