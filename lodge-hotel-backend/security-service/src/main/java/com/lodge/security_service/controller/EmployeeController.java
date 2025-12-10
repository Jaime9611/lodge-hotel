package com.lodge.security_service.controller;

import com.lodge.security_service.model.UserEntity;
import com.lodge.security_service.service.UserService;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/employee")
public class EmployeeController {

  private final UserService userService;
  private final RestTemplate restTemplate;

  @GetMapping("/data")
  @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_STAFF')")
  public ResponseEntity<?> getEmployee(@RequestHeader("Authorization") String authorizationHeader) {

    UserEntity user = userService.getEmployee(authorizationHeader);

    if (user == null) {
      return new ResponseEntity<String>("Error trying to access different user.",
          HttpStatus.UNAUTHORIZED);
    }

    return ResponseEntity.ok(user);
  }

  @GetMapping()
  @PreAuthorize("hasAnyRole('ROLE_MANAGER')")
  public ResponseEntity<List<UserEntity>> getEmployees() {
    return ResponseEntity.ok(userService.getEmployees());
  }

  @PostMapping("/register")
  @PreAuthorize("hasAnyRole('ROLE_MANAGER')")
  public ResponseEntity<?> createEmployee(@RequestBody @Validated UserEntity user) {
    return ResponseEntity.ok(userService.registerEmployee(user));
  }

  @PostMapping("/image")
  @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_STAFF')")
  public ResponseEntity<?> addImage(@RequestParam("imageName") String imageName,
      @RequestParam("images") MultipartFile image, @RequestHeader("Authorization") String authorizationHeader)
      throws IOException {

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);
    System.out.println(authorizationHeader);
    headers.set("Authorization", authorizationHeader);

    String uploadDirectory = "src/main/resources/tmp";
    Path uploadPath = Path.of(uploadDirectory);

    if (!Files.exists(uploadPath)) {
      Files.createDirectories(uploadPath);
    }

    Path filePath = uploadPath.resolve(image.getOriginalFilename());
    Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

    File f = new File(filePath.toUri());

    FileSystemResource fileSystemResource = new FileSystemResource(f);
    MultiValueMap<String, Object> body
        = new LinkedMultiValueMap<>();
    body.add("imageName", imageName);
    body.add("images", fileSystemResource);

    HttpEntity<MultiValueMap<String, Object>> requestEntity
        = new HttpEntity<>(body, headers);

    String url = "http://lodge-api/api/v1/storage/cabin-images";
    return restTemplate.postForEntity(url, requestEntity, Void.class);
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAnyRole('ROLE_MANAGER', 'ROLE_STAFF')")
  public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody @Validated UserEntity user) {

    userService.updateEmployee(id, user);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAnyRole('ROLE_MANAGER')")
  public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {

    userService.deleteEmployee(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
