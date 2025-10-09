package com.lodge.security_service.controller;

import com.lodge.security_service.model.UserEntity;
import com.lodge.security_service.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/employee")
public class EmployeeController {

  private final UserService userService;

  @GetMapping()
  @PreAuthorize("hasAnyRole('ROLE_MANAGER')")
  public ResponseEntity<List<UserEntity>> getEmployees() {
    return ResponseEntity.ok(userService.getEmployees());
  }

  @PostMapping("/register")
  @PreAuthorize("hasAnyRole('ROLE_MANAGER')")
  public ResponseEntity<?> createEmployee(@RequestBody UserEntity user) {
    return ResponseEntity.ok(userService.registerEmployee(user));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasAnyRole('ROLE_MANAGER')")
  public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody UserEntity user) {

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
