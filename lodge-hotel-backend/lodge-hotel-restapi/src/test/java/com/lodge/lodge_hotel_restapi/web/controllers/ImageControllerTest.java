package com.lodge.lodge_hotel_restapi.web.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.lodge.lodge_hotel_restapi.application.services.ImageService;
import com.lodge.lodge_hotel_restapi.config.KeyStoreConfig;
import com.lodge.lodge_hotel_restapi.config.SecurityConfig;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import com.lodge.lodge_hotel_restapi.utils.constants.UserConstants;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;

@WebMvcTest(ImageController.class)
@Import({SecurityConfig.class, KeyStoreConfig.class})
@ExtendWith(MockitoExtension.class)
class ImageControllerTest {

  @Autowired
  MockMvc mockMvc;

  @MockitoBean
  ImageService imageService;

  @InjectMocks
  ImageController imageController;

  @Test
  @WithMockUser(username = "testuser", authorities = {UserConstants.ROLE_STAFF})
  void testGetImage() throws Exception {
    // Arrange
    byte[] testBytes = "test content".getBytes();

    given(imageService.getImage(anyString(), anyString())).willReturn(testBytes);

    // Assert
    mockMvc.perform(get(Endpoints.STORAGE + "/" + Endpoints.GET_IMAGE, "test").accept(
            MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  @Test
  @WithMockUser(username = "testuser", authorities = {UserConstants.ROLE_STAFF})
  void testSaveImage() throws Exception {
    // Arrange
    // Create a mock file
    MockMultipartFile mockFile = new MockMultipartFile(
        "images",                       // form field name
        "test.txt",                   // original filename
        MediaType.TEXT_PLAIN_VALUE,   // content type
        "Hello, World!".getBytes()    // file content
    );

    // Act
    mockMvc.perform(multipart(Endpoints.STORAGE + "/" + Endpoints.IMAGES).file(mockFile)
            .param("imageName", "test").contentType(MediaType.MULTIPART_FORM_DATA))
        .andExpect(status().isCreated());

    // Assert
    verify(imageService, times(1)).saveImageToStorage(anyString(), any(MultipartFile.class), anyString());
  }
}