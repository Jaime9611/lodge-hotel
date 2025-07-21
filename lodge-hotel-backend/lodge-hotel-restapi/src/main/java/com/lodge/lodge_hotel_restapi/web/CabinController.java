package com.lodge.lodge_hotel_restapi.web;

import com.lodge.lodge_hotel_restapi.application.services.CabinService;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cabin")
public class CabinController {

    private final CabinService cabinService;

    @GetMapping
    public ResponseEntity<String> getCabins() {
        return ResponseEntity.ok("{\"message\": \"Method Worked!\"}");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cabin> getCabin(@PathVariable Long id) {
        return ResponseEntity.ok(cabinService.get(id));
    }
}
