package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.services.ImageService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

  @Override
  public void saveImageToStorage(String uploadDirectory, MultipartFile imageFile, String imageName)
      throws IOException {

    Path uploadPath = Path.of(uploadDirectory);
    Path filePath = uploadPath.resolve(imageName);

    if (!Files.exists(uploadPath)) {
      Files.createDirectories(uploadPath);
    }

    Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

  }

  @Override
  public byte[] getImage(String imageDirectory, String imageName) throws IOException {
    Path imagePath = Path.of(imageDirectory, imageName);

    if (Files.exists(imagePath)) {
      return Files.readAllBytes(imagePath);
    } else {
      throw  new IOException(); // TODO: Handle missing images
    }
  }

  @Override
  public boolean deleteImage(String imageDirectory, String imageName) throws IOException {
    Path imagePath = Path.of(imageDirectory, imageName);

    if (Files.exists(imagePath)) {
      Files.delete(imagePath);
      return true;
    } else {
      return false; // TODO: Handle missing images
    }
  }
}
