package com.lodge.security_service.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

  @Bean
  public OpenAPI securityServiceAPI() {
    return new OpenAPI()
        .info(new Info().title("Security Service API")
            .description("This is the API for the users.")
            .version("v.0.0.1"));
  }
}
