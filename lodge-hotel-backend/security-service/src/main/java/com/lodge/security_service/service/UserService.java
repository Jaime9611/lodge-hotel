package com.lodge.security_service.service;

import com.lodge.security_service.model.UserEntity;
import com.lodge.security_service.repository.UserRepository;
import com.lodge.security_service.utils.Constants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.ws.rs.NotFoundException;
import java.security.KeyStore;
import java.security.PublicKey;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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

  @Value("${keyStore.alias}")
  private String keyStoreAlias;

  private final KeyStore keyStore;

  private static final int EXPIRATION_TIME_SEC = 3600;

  public void deleteEmployee(Long id) {
    UserEntity foundUser = userRepository.findById(id).orElseThrow(RuntimeException::new);

    userRepository.deleteById(id);
  }

  public void updateEmployee(Long id, UserEntity user) {
    UserEntity foundUser = userRepository.findById(id).orElseThrow(RuntimeException::new);

    foundUser.setUsername(user.getUsername());
    foundUser.setFullName(user.getFullName());
    foundUser.setPhone(user.getPhone());
    foundUser.setEmail(user.getEmail());

    if(user.getImage() != null && !user.getImage().isBlank()) {
      foundUser.setImage(user.getImage());

    }

    if(user.getPassword() != null && !user.getPassword().isBlank()) {
      foundUser.setPassword(passwordEncoder.encode(user.getPassword()));
    }

    userRepository.save(foundUser);
  }

  public UserEntity getEmployee(String authHeader) {
    String token = authHeader.substring(7);

    try {
      PublicKey publicKey = keyStore.getCertificate(keyStoreAlias).getPublicKey();

      Claims claims = Jwts.parserBuilder()
          .setSigningKey(publicKey)
          .build()
          .parseClaimsJws(token)
          .getBody();

      Long userId = claims.get("userId", Long.class);

      Optional<UserEntity> user = userRepository.findById(userId);

      if (!user.isPresent()) {
        throw new NotFoundException();
      }

      UserEntity userEntity = user.get();
      userEntity.setPassword(null);

      return userEntity;

    } catch (Exception e) {
      throw new RuntimeException(e);
    }


  }

  public List<UserEntity> getEmployees() {
    return userRepository.findAllByRole("ROLE_STAFF").stream().map(
        user -> UserEntity.builder().id(user.getId()).email(user.getEmail()).phone(user.getPhone())
            .image(user.getImage()).password(null).fullName(user.getFullName()).username(user.getUsername()).build()).toList();
  }

  public String registerEmployee(UserEntity user) {
    Optional<UserEntity> userEntity = userRepository.findByUsername(user.getUsername());
    if (userEntity.isPresent()) {
      return "Username already taken";
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setFullName(user.getFullName());
    user.setEmail(user.getEmail());
    user.setPhone(user.getPhone());
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
        .claim("userId", userEntity.getId())
        .build();

    return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
  }
}
