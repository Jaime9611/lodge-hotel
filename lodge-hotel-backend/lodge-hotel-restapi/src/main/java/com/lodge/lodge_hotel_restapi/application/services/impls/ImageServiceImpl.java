package com.lodge.lodge_hotel_restapi.application.services.impls;

import com.lodge.lodge_hotel_restapi.application.services.ImageService;
import com.luciad.imageio.webp.WebPWriteParam;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageOutputStream;
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
    Path filePath = uploadPath.resolve(imageName.replace(".jpg", ".webp"));

    if (!Files.exists(uploadPath)) {
      Files.createDirectories(uploadPath);
    }

    BufferedImage image = ImageIO.read(imageFile.getInputStream());
//    Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

    ImageWriter writer = ImageIO.getImageWritersByMIMEType("image/webp").next();
    WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
    writeParam.setCompressionMode(WebPWriteParam.MODE_EXPLICIT);
    writeParam.setCompressionType("Lossy");
    writeParam.setCompressionQuality(0.8f); // Adjust quality as needed (0.0f to 1.0f)

    File outputWebpFile = new File(filePath.toString());
    try (FileImageOutputStream outputStream = new FileImageOutputStream(outputWebpFile)) {
      writer.setOutput(outputStream);
      writer.write(null, new IIOImage(image, null, null), writeParam);
    } finally {
      writer.dispose();
    }

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
