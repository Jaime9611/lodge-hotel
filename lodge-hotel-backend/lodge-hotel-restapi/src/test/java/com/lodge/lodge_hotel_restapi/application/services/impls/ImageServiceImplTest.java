package com.lodge.lodge_hotel_restapi.application.services.impls;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;

import com.lodge.lodge_hotel_restapi.application.services.ImageService;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Iterator;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

class ImageServiceImplTest {

  private static final String IMAGE_NAME = "java-test.jpg";

  @TempDir
  Path tempDir;

  ImageService service;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    service = new ImageServiceImpl();
  }

  @Test
  void testGetImage() throws IOException {
    // Arrange
    Path filePath = tempDir.resolve(IMAGE_NAME);
    Files.writeString(filePath, "test content");

    // Act
    byte[] result = service.getImage(tempDir.toString(), IMAGE_NAME);

    // Assert
    assertTrue(Files.exists(filePath));
    assertNotNull(result);
  }

  @Test
  void testSaveImage() throws IOException {
    // Arrange
    String fileContent = "This is a test file content";

    // Convert String to InputStream
    ByteArrayInputStream inputStream =
        new ByteArrayInputStream(fileContent.getBytes(StandardCharsets.UTF_8));
    MultipartFile multipartFile = new MockMultipartFile(
        "test",
        "test.jpg",
        "image/jpg",
        inputStream
    );

    // Create a fake BufferedImage
    BufferedImage mockImage = new BufferedImage(10, 10, BufferedImage.TYPE_INT_RGB);

    // Create a mock ImageWriter
    ImageWriter mockWriter = mock(ImageWriter.class);

    // Mock ImageOutputStream
    ImageOutputStream mockOutputStream = mock(ImageOutputStream.class);

    // Mock static methods of ImageIO
    try (MockedStatic<ImageIO> mockedImageIO = mockStatic(ImageIO.class)) {

      // Mock ImageIO.read(File)
      mockedImageIO.when(() -> ImageIO.read(any(InputStream.class)))
          .thenReturn(mockImage);

      // Mock ImageIO.getImageWritersByFormatName("png")
      mockedImageIO.when(() -> ImageIO.getImageWritersByMIMEType(eq("image/webp")))
          .thenReturn(new Iterator<ImageWriter>() {
            private boolean hasNext = true;

            @Override
            public boolean hasNext() {
              return hasNext;
            }

            @Override
            public ImageWriter next() {
              hasNext = false;
              return mockWriter;
            }
          });

      // Mock ImageIO.createImageOutputStream(any())
      mockedImageIO.when(() -> ImageIO.createImageOutputStream(any()))
          .thenReturn(mockOutputStream);

      service.saveImageToStorage(tempDir.toString(), multipartFile, IMAGE_NAME);

      // Assert
      mockedImageIO.verify(() -> ImageIO.read(any(InputStream.class)), times(1));
    }
  }

  @Test
  void testDeleteImage() throws IOException {
    // Arrange
    Path filePath = tempDir.resolve(IMAGE_NAME);
    Files.writeString(filePath, "test content");

    // Act
    service.deleteImage(tempDir.toString(), IMAGE_NAME);

    // Assert
    assertFalse(Files.exists(filePath));
  }
}