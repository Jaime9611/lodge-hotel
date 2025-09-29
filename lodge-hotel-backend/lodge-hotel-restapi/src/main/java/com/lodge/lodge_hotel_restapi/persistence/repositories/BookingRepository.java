package com.lodge.lodge_hotel_restapi.persistence.repositories;

import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
  Page<BookingEntity> findAllByCreatedAtBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
}
