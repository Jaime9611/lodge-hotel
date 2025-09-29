package com.lodge.lodge_hotel_restapi.persistence.repositories;

import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {

  Page<BookingEntity> findAllByCreatedAtBetween(LocalDateTime start, LocalDateTime end,
      Pageable pageable);

  Page<BookingEntity> findAllByStartDateGreaterThanEqual(LocalDateTime date, Pageable pageable);

  @Query(value = "SELECT e FROM BookingEntity e  WHERE (e.status = 'UNCONFIRMED' AND DATE(e.startDate) = CURRENT_DATE) OR (e.status = 'CHECKED_IN' AND DATE(e.endDate) = CURRENT_DATE)")
  Page<BookingEntity> findAllStaysForToday(Pageable pageable);
}
