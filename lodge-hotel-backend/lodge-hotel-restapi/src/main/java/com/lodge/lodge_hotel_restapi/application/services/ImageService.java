package com.lodge.lodge_hotel_restapi.application.services;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

  void saveImageToStorage(String uploadDirectory, MultipartFile imageFile, String imageName) throws IOException;

  byte[] getImage(String imageDirectory, String imageName) throws IOException;

  boolean deleteImage(String imageDirectory, String imageName) throws IOException;

}
