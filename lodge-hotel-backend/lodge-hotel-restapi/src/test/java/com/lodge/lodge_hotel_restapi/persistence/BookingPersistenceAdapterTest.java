package com.lodge.lodge_hotel_restapi.persistence;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.BookingStatus;
import com.lodge.lodge_hotel_restapi.factories.BookingFactory;
import com.lodge.lodge_hotel_restapi.factories.CabinFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls.BookingMapperImpl;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls.CabinMapperImpl;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls.GuestMapperImpl;
import com.lodge.lodge_hotel_restapi.persistence.repositories.BookingRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

class BookingPersistenceAdapterTest {

  @Mock
  BookingRepository bookingRepository;

  BookingPersistenceAdapter persistenceAdapter;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    persistenceAdapter = new BookingPersistenceAdapter(bookingRepository,
        new BookingMapperImpl(new CabinMapperImpl(), new GuestMapperImpl()));
  }

  @Test
  void testUpdateBooking() {
    // Arrange
    Booking testBooking = BookingFactory.createSingleBooking();
    ArgumentCaptor<BookingEntity> bookingArgumentCaptor = ArgumentCaptor.forClass(
        BookingEntity.class);

    // Act
    persistenceAdapter.update(testBooking);

    // Assert
    verify(bookingRepository).save(bookingArgumentCaptor.capture());

    assertThat(bookingArgumentCaptor.getValue().getId()).isEqualTo(testBooking.getId());
  }

  @Test
  void testDeleteBooking() {
    // Arrange
    ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);

    // Act
    persistenceAdapter.delete(BookingFactory.TEST_ID);

    // Assert
    verify(bookingRepository).deleteById(idArgumentCaptor.capture());

    assertThat(idArgumentCaptor.getValue()).isEqualTo(BookingFactory.TEST_ID);
  }

  @Test
  void testSaveBooking() {
    //  Arrange
    Booking testBooking = BookingFactory.createSingleBooking();

    given(bookingRepository.save(any(BookingEntity.class))).willReturn(BookingEntity.builder()
        .id(testBooking.getId()).cabins(
            testBooking.getCabins().stream().map(cabin -> CabinFactory.createSingleCabinEntity())
                .collect(Collectors.toSet())).startDate(testBooking.getStartDate())
        .endDate(testBooking.getEndDate()).build());

    // Act
    testBooking.setId(null);
    Booking savedBooking = persistenceAdapter.save(testBooking);

    // Assert
    verify(bookingRepository, times(1)).save(any(BookingEntity.class));
    assertThat(savedBooking.getId()).isNotNull();
  }

  @Test
  void testGetBookingList() {
    // Arrange
    List<BookingEntity> testBookings = BookingFactory.createBookingEntityList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<BookingEntity> testPage = new PageImpl<>(testBookings, pageable, totalElements);
    given(bookingRepository.findAll(any(PageRequest.class))).willReturn(testPage);

    // Act
    Page<Booking> foundBookings = persistenceAdapter.getAll(PageRequest.of(0, 1));

    // Assert
    assertThat(foundBookings.getTotalElements()).isEqualTo(2);
  }

  @Test
  void testGetBookingsByStatus() {
    // Arrange
    List<BookingEntity> testBookings = BookingFactory.createBookingEntityList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<BookingEntity> testPage = new PageImpl<>(testBookings, pageable, totalElements);

    given(bookingRepository.findAllByStatus(any(BookingStatus.class),
        any(PageRequest.class))).willReturn(testPage);

    // Act
    Page<Booking> foundBookings = persistenceAdapter.getAllByStatus(BookingStatus.CHECKED_IN,
        PageRequest.of(0, 1));

    // Assert
    assertThat(foundBookings.getTotalElements()).isEqualTo(2);
  }

  @Test
  void testGetBookingsAfterDate() {
    // Arrange
    List<BookingEntity> testBookings = BookingFactory.createBookingEntityList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<BookingEntity> testPage = new PageImpl<>(testBookings, pageable, totalElements);

    given(bookingRepository.findAllByCreatedAtBetween(any(LocalDateTime.class),
        any(LocalDateTime.class),
        any(PageRequest.class))).willReturn(testPage);

    // Act
    Page<Booking> foundBookings = persistenceAdapter.getAfterDate(LocalDate.now(),
        LocalDate.now().plusDays(2L),
        PageRequest.of(0, 1));

    // Assert
    assertThat(foundBookings.getTotalElements()).isEqualTo(2);
  }

  @Test
  void testGetStaysAfterDate() {
    // Arrange
    List<BookingEntity> testBookings = BookingFactory.createBookingEntityList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<BookingEntity> testPage = new PageImpl<>(testBookings, pageable, totalElements);

    given(bookingRepository.findAllByStartDateGreaterThanEqual(
        any(LocalDateTime.class),
        any(PageRequest.class))).willReturn(testPage);

    // Act
    Page<Booking> foundBookings = persistenceAdapter.getStaysAfterDate(
        LocalDate.now().plusDays(2L),
        PageRequest.of(0, 1));

    // Assert
    assertThat(foundBookings.getTotalElements()).isEqualTo(2);
  }

  @Test
  void testGetTodayActivity() {
    // Arrange
    List<BookingEntity> testBookings = BookingFactory.createBookingEntityList(2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<BookingEntity> testPage = new PageImpl<>(testBookings, pageable, totalElements);

    given(bookingRepository.findAllStaysForToday(
        any(PageRequest.class))).willReturn(testPage);

    // Act
    Page<Booking> foundBookings = persistenceAdapter.getTodayActivity(
        PageRequest.of(0, 1));

    // Assert
    assertThat(foundBookings.getTotalElements()).isEqualTo(2);
  }

  @Test
  void testGetBookedReservations() {
    // Arrange
    List<BookingEntity> testBookings = BookingFactory.createBookingEntityList(2);

    given(bookingRepository.findAllBookedReservations(
        anyLong())).willReturn(testBookings);

    // Act
    List<Booking> foundBookings = persistenceAdapter.getBookedReservations(1L);

    // Assert
    assertThat(foundBookings.size()).isEqualTo(2);
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
  }
}