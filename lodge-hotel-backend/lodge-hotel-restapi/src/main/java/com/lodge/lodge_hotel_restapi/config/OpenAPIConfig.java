package com.lodge.lodge_hotel_restapi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

  @Bean
  public OpenAPI lodgeServiceAPI() {
    return new OpenAPI()
        .info(new Info().title("Lodge Service REST API")
            .description("this is the REST API for the Hotel.")
            .version("v.0.0.1"));
  }
}
