package com.lodge.security_service.config;

import com.lodge.security_service.service.CustomUserDetailService;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.io.IOException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

  @Value("${keyStore.path}")
  private String keyStorePath;

  @Value("${keyStore.password}")
  private String keyStorePassword;

  private final CustomUserDetailService customUserDetailService;
  private final JwtTokenFilter jwtTokenFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll()
            .anyRequest().authenticated())
        .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
        .formLogin(AbstractHttpConfigurer::disable);

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public JwtEncoder jwtEncoder()
      throws UnrecoverableKeyException, CertificateException, KeyStoreException, IOException, NoSuchAlgorithmException {
    RSAKey rsaKey = loadRSAKey();
    JWKSource<SecurityContext> jwkSource = ((jwkSelector, securityContext) -> jwkSelector.select(
        new JWKSet(rsaKey)));

    return new NimbusJwtEncoder(jwkSource);
  }

  private RSAKey loadRSAKey()
      throws KeyStoreException, IOException, CertificateException, NoSuchAlgorithmException, UnrecoverableKeyException {
    KeyStore keyStore = KeyStore.getInstance("JKS");
    keyStore.load(new ClassPathResource(keyStorePath).getInputStream(),
        keyStorePassword.toCharArray());

    RSAPublicKey pubKey = (RSAPublicKey) keyStore.getCertificate("auth-server").getPublicKey();
    RSAPrivateKey privateKey = (RSAPrivateKey) keyStore.getKey("auth-server",
        keyStorePassword.toCharArray());

    return new RSAKey.Builder(pubKey).privateKey(privateKey).keyID("auth-server").build();
  }
}
