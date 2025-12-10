package com.lodge.security_service.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Username is required.")
  @Size(min = 5, message = "Username must be at least 5 characters.")
  @Column(nullable = false)
  private String username;

  @Column(nullable = false)
  private String password;

  @NotBlank(message = "FullName is required.")
  private String fullName;

  @Email
  private String email;

  @Size(min = 10, max = 17, message = "Phone number must be between 10 and 17 digits")
  @Pattern(
      regexp = "^\\+?[0-9]{10,17}$",
      message = "Invalid phone number format. Use digits only, optionally starting with +"
  )
  private String phone;

  private String image;

  private String role;
}
