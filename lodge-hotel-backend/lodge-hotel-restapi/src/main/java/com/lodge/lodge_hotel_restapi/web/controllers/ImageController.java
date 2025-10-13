package com.lodge.lodge_hotel_restapi.web.controllers;

import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.application.services.ImageService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/api/v1/storage")
public class ImageController {

  // TODO: CREATE ENDPOINT CONSTANT
  private final ImageService imageService;
  private final CabinService cabinService;

  @PostMapping("cabin-images")
  public ResponseEntity<?> createImage(
      @RequestParam("imageName") String imageName,
      @RequestParam("images") MultipartFile[] images
  ) throws IOException {
    String uploadDirectory = "src/main/resources/static/images/cabin-images";

    for (MultipartFile imageFile : images) {
      imageService.saveImageToStorage(uploadDirectory, imageFile, imageName);
    }

    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @GetMapping("public/cabin/{imageName}")
  public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
    try {
      String imageDirectory = "src/main/resources/static/images/cabin-images";

      // Fetch image data as byte arrays
      byte[] imageBytes = imageService.getImage(imageDirectory, imageName);

      // Respond with the image data and an OK status code
      return ResponseEntity.ok().contentType(MediaType.parseMediaType("image/webp")).body(imageBytes);
    } catch (Exception e) {
      // Handle exceptions and provide appropriate error responses
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}
