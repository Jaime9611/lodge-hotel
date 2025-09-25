package com.lodge.lodge_hotel_restapi.persistence;

import com.lodge.lodge_hotel_restapi.application.ports.booking.CreateBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.DeleteBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.ReadBookingPort;
import com.lodge.lodge_hotel_restapi.application.ports.booking.UpdateBookingPort;
import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.BookingMapper;
import com.lodge.lodge_hotel_restapi.persistence.repositories.BookingRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookingPersistenceAdapter implements CreateBookingPort, ReadBookingPort,
    UpdateBookingPort, DeleteBookingPort {

  private final BookingRepository bookingRepository;
  private final BookingMapper bookingMapper;

  @Override
  public Booking save(Booking booking) {
    BookingEntity newBooking = bookingMapper.bookingToBookingEntity(booking);

    return bookingMapper.bookingEntityToBooking(bookingRepository.save(newBooking));
  }

  @Override
  public void delete(Long id) {
    bookingRepository.deleteById(id);
  }

  @Override
  public Optional<Booking> get(Long id) {
    Optional<BookingEntity> foundBookingEntity = bookingRepository.findById(id);

    return foundBookingEntity.map(bookingMapper::bookingEntityToBooking);
  }

  @Override
  public Page<Booking> getAll(PageRequest pageRequest) {
    Page<BookingEntity> foundBookings = bookingRepository.findAll(pageRequest);

    return foundBookings.map(bookingMapper::bookingEntityToBooking);
  }

  @Override
  public void update(Booking booking) {
    bookingRepository.save(bookingMapper.bookingToBookingEntity(booking));
  }
}
