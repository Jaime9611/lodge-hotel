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
      userRepository.save(new UserEntity(null, "manager@test.com", passwordEncoder.encode("pwd123"), Constants.ROLE_MANAGER, null));
      userRepository.save(new UserEntity(null, "staff@test.com", passwordEncoder.encode("pwd123"), Constants.ROLE_STAFF, null));
    };
  }
}
