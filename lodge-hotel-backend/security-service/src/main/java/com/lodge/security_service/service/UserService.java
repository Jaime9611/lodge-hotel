package com.lodge.security_service.service;

import com.lodge.security_service.model.UserEntity;
import com.lodge.security_service.repository.UserRepository;
import com.lodge.security_service.utils.Constants;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtEncoder jwtEncoder;
  private final AuthenticationManager authenticationManager;

  private static final int EXPIRATION_TIME_SEC = 3600;

  public void deleteEmployee(Long id) {
    UserEntity foundUser = userRepository.findById(id).orElseThrow(RuntimeException::new);

    userRepository.deleteById(id);
  }

  public void updateEmployee(Long id, UserEntity user) {
    UserEntity foundUser = userRepository.findById(id).orElseThrow(RuntimeException::new);

    foundUser.setUsername(user.getUsername());
    foundUser.setPassword(passwordEncoder.encode(user.getPassword()));

    userRepository.save(foundUser);
  }

  public List<UserEntity> getEmployees() {
    return userRepository.findAllByRole("ROLE_STAFF").stream()
        .map(user -> UserEntity.builder().id(user.getId()).username(user.getUsername()).build())
        .toList();
  }

  public String registerUser(UserEntity user) {
    Optional<UserEntity> userEntity = userRepository.findByUsername(user.getUsername());
    if (userEntity.isPresent()) {
      return "Username already taken";
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRole(Constants.ROLE_USER);
    userRepository.save(user);

    return "User Registered successfully.";
  }

  public String registerEmployee(UserEntity user) {
    Optional<UserEntity> userEntity = userRepository.findByUsername(user.getUsername());
    if (userEntity.isPresent()) {
      return "Username already taken";
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRole(Constants.ROLE_STAFF);
    userRepository.save(user);

    return "User Registered successfully.";
  }

  public Map<String, Object> login(String username, String password) {
    Optional<UserEntity> userEntity = userRepository.findByUsername(username);
    Map<String, Object> response = new HashMap<>();

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(username, password));
    if (userEntity.isEmpty()) {
      response.put("status", "User not found.");
      return response;
    }

    String accessToken = generateToken(userEntity.get(), authentication);
    response.put("access_token", accessToken);
    response.put("expires_in", EXPIRATION_TIME_SEC);

    return response;
  }

  private String generateToken(UserEntity userEntity, Authentication authentication) {
    Instant now = Instant.now();
    JwtClaimsSet claimsSet = JwtClaimsSet.builder()
        .issuer("lodge-api")
        .issuedAt(now)
        .expiresAt(now.plusSeconds(EXPIRATION_TIME_SEC))
        .subject(authentication.getName())
        .claim("role", authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toSet()))
        .claim("user", userEntity.getUsername())
        .build();

    return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
  }
}
