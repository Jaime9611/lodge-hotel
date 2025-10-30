package com.lodge.lodge_hotel_restapi.persistence.repositories;

import com.lodge.lodge_hotel_restapi.domain.BookingStatus;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {

  Page<BookingEntity> findAllByCreatedAtBetween(LocalDateTime start, LocalDateTime end,
      Pageable pageable);

  Page<BookingEntity> findAllByStartDateGreaterThanEqual(LocalDateTime date, Pageable pageable);

  Page<BookingEntity> findAllByStatus(BookingStatus status, Pageable pageable);

  @Query(value = "SELECT * FROM booking b WHERE (b.status = 'UNCONFIRMED' AND DATE(b.start_date) = CURRENT_DATE()) OR (b.status = 'CHECKED_IN' AND DATE(b.end_date) = CURRENT_DATE())", nativeQuery = true)
  Page<BookingEntity> findAllStaysForToday(Pageable pageable);

  @Query(value = "SELECT * FROM booking b JOIN booking_cabin AS bc ON bc.booking_id = b.id WHERE bc.cabin_id = :cabinId AND (b.status = 'CHECKED_IN' OR DATE(b.start_date) >= CURRENT_DATE())", nativeQuery = true)
  List<BookingEntity> findAllBookedReservations(@Param("cabinId") Long cabinId);
}
