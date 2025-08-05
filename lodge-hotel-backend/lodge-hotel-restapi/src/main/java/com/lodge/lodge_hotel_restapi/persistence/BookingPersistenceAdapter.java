package com.lodge.lodge_hotel_restapi.persistence;

import com.lodge.lodge_hotel_restapi.application.ports.CreateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.DeleteBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.ReadBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.UpdateBookingPort;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.BookingMapper;
import com.lodge.lodge_hotel_restapi.persistence.repositories.BookingRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookingPersistenceAdapter implements CreateBookingPort, ReadBookingPort,
    UpdateBookingPort, DeleteBookingPort {

  private final BookingRepository bookingRepository;
  private final BookingMapper bookingMapper;

  @Override
  public Booking save(Booking booking) {
    return null;
  }

  @Override
  public void delete(Long id) {

  }

  @Override
  public Optional<Booking> get(Long id) {
    Optional<BookingEntity> foundBookingEntity = bookingRepository.findById(id);

    return foundBookingEntity.map(bookingMapper::bookingEntityToBooking);
  }

  @Override
  public List<Booking> getAll() {
    List<BookingEntity> foundCabins = bookingRepository.findAll();

    return foundCabins.stream().map(bookingMapper::bookingEntityToBooking).toList();
  }

  @Override
  public void update(Booking booking) {

  }
}
