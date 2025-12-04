package com.lodge.security_service.config;

import com.lodge.security_service.model.UserEntity;
import com.lodge.security_service.repository.UserRepository;
import com.lodge.security_service.utils.Constants;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

  @Bean
  CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    return args -> {
      userRepository.save(
          new UserEntity(null, "manager@test.com", passwordEncoder.encode("pwd123"), "John Doe",
              "manager@test.com", "1334556332",
              "http://localhost:8080/api/v1/storage/public/cabin/0.13602842358912626-admin.webp",
              Constants.ROLE_MANAGER));
      userRepository.save(
          new UserEntity(null, "staff@test.com", passwordEncoder.encode("pwd123"), "William Smith",
              "staff@test.com", "1334556332",
              "http://localhost:8080/api/v1/storage/public/cabin/0.18017638977683215-profile-pic.webp",
              Constants.ROLE_STAFF));
      userRepository.save(
          new UserEntity(null, "luciaramirez03", passwordEncoder.encode("pwd123"), "Lucia Ramirez",
              "ramirezlu@mail.com", "2345678909",
              "http://localhost:8080/api/v1/storage/public/cabin/0.19732678318711705-girl.webp",
              Constants.ROLE_STAFF));
      userRepository.save(
          new UserEntity(null, "carlosc98", passwordEncoder.encode("pwd123"), "Carlos Castilla",
              "carlosc@mail.com", "2345453221",
              "http://localhost:8080/api/v1/storage/public/cabin/0.8016316793937676-profile-2.webp",
              Constants.ROLE_STAFF));
      userRepository.save(
          new UserEntity(null, "sofiabn87", passwordEncoder.encode("pwd123"), "Sofia Benavidez",
              "sofiab@mail.com", "23485836787",
              "http://localhost:8080/api/v1/storage/public/cabin/0.8539171718645523-girl-3.webp",
              Constants.ROLE_STAFF));
    };
  }
}
