package com.lodge.lodge_hotel_restapi.persistence;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.factories.BookingFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls.BookingMapperImpl;
import com.lodge.lodge_hotel_restapi.persistence.repositories.BookingRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class BookingPersistenceAdapterTest {

  @Mock
  BookingRepository bookingRepository;

  BookingPersistenceAdapter persistenceAdapter;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    persistenceAdapter = new BookingPersistenceAdapter(bookingRepository, new BookingMapperImpl());
  }

  @Test
  void testGetBookingList() {
    // Arrange
    List<BookingEntity> testBookings = BookingFactory.createBookingEntityList(2);

    given(bookingRepository.findAll()).willReturn(testBookings);

    // Act
    List<Booking> foundBookings = persistenceAdapter.getAll();

    // Assert
    assertThat(foundBookings.size()).isEqualTo(2);
    assertThat(foundBookings.get(0).getId()).isEqualTo(testBookings.get(0).getId());
    assertThat(foundBookings.get(0).getName()).isEqualTo(testBookings.get(0).getName());

    assertThat(foundBookings.get(1).getId()).isEqualTo(testBookings.get(1).getId());
    assertThat(foundBookings.get(1).getName()).isEqualTo(testBookings.get(1).getName());
  }

  @Test
  void testGetByIdNotFound() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    given(bookingRepository.findById(BookingFactory.TEST_ID)).willReturn(Optional.empty());

    // Act
    Optional<Booking> foundBooking = persistenceAdapter.get(BookingFactory.TEST_ID);

    // Assert
    assertThat(foundBooking.isEmpty()).isTrue();
  }

  @Test
  void testGetById() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    BookingEntity testEntity = BookingFactory.createSingleBookingEntity();

    given(bookingRepository.findById(BookingFactory.TEST_ID)).willReturn(Optional.of(testEntity));

    // Act
    Optional<Booking> foundBooking = persistenceAdapter.get(BookingFactory.TEST_ID);

    // Assert
    assertThat(foundBooking.isPresent()).isTrue();
    assertThat(foundBooking.get().getName()).isEqualTo(testEntity.getName());
  }
}