package com.lodge.lodge_hotel_restapi.web.controllers;

import com.lodge.lodge_hotel_restapi.application.services.ImageService;
import com.lodge.lodge_hotel_restapi.utils.constants.Endpoints;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping(Endpoints.STORAGE)
public class ImageController {

  private final ImageService imageService;
  private final String MEDIA_TYPE = "image/webp";

  @Value("${static.images.path}")
  private String imageDirectory;

  @PostMapping(Endpoints.IMAGES)
  public ResponseEntity<?> createImage(
      @RequestParam("imageName") String imageName,
      @RequestParam("images") MultipartFile[] images
  ) throws IOException {

    for (MultipartFile imageFile : images) {
      imageService.saveImageToStorage(imageDirectory, imageFile, imageName);
    }

    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @GetMapping(Endpoints.GET_IMAGE)
  public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
    try {
      // Fetch image data as byte arrays
      byte[] imageBytes = imageService.getImage(imageDirectory, imageName);

      // Respond with the image data and an OK status code
      return ResponseEntity.ok().contentType(MediaType.parseMediaType(MEDIA_TYPE))
          .body(imageBytes);
    } catch (Exception e) {
      // Handle exceptions and provide appropriate error responses
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }
}
