package com.lodge.lodge_hotel_restapi.persistence;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.lodge.lodge_hotel_restapi.domain.Guest;
import com.lodge.lodge_hotel_restapi.factories.BookingFactory;
import com.lodge.lodge_hotel_restapi.factories.GuestFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.GuestEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls.GuestMapperImpl;
import com.lodge.lodge_hotel_restapi.persistence.repositories.GuestRepository;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class GuestPersistenceAdapterTest {

  @Mock
  GuestRepository guestRepository;

  GuestPersistenceAdapter persistenceAdapter;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    persistenceAdapter = new GuestPersistenceAdapter(guestRepository,
        new GuestMapperImpl());
  }

  @Test
  void testDeleteGuest() {
    // Arrange
    ArgumentCaptor<Long> idArgumentCaptor = ArgumentCaptor.forClass(Long.class);

    // Act
    persistenceAdapter.delete(GuestFactory.TEST_ID);

    // Assert
    verify(guestRepository).deleteById(idArgumentCaptor.capture());

    assertThat(idArgumentCaptor.getValue()).isEqualTo(GuestFactory.TEST_ID);
  }

  @Test
  void testSaveGuest() {
    //  Arrange
    Guest testGuest = GuestFactory.createSingleGuest();

    given(guestRepository.save(any(GuestEntity.class))).willReturn(GuestEntity.builder()
        .id(testGuest.getId())
        .email(testGuest.getEmail())
        .countryFlag(testGuest.getCountryFlag())
        .fullName(testGuest.getFullName())
        .country(testGuest.getCountry())
        .nationalId(testGuest.getNationalId())
        .build());

    // Act
    Guest savedGuest = persistenceAdapter.save(testGuest);

    // Assert
    verify(guestRepository, times(1)).save(any(GuestEntity.class));
    assertThat(savedGuest.getId()).isEqualTo(testGuest.getId());
    assertThat(savedGuest.getEmail()).isEqualTo(testGuest.getEmail());
    assertThat(savedGuest.getFullName()).isEqualTo(testGuest.getFullName());
    assertThat(savedGuest.getCountry()).isEqualTo(testGuest.getCountry());
  }

  @Test
  void testUpdateGuest() {
    // Arrange
    Guest testGuest = GuestFactory.createSingleGuest();
    ArgumentCaptor<GuestEntity> guestArgumentCaptor = ArgumentCaptor.forClass(
        GuestEntity.class);

    // Act
    persistenceAdapter.update(testGuest);

    // Assert
    verify(guestRepository).save(guestArgumentCaptor.capture());

    assertThat(guestArgumentCaptor.getValue().getId()).isEqualTo(testGuest.getId());
  }

  @Test
  void testGetById() {
    // Arrange
    Guest testGuest = GuestFactory.createSingleGuest();

    GuestEntity testEntity = GuestFactory.createSingleGuestEntity();

    given(guestRepository.findById(BookingFactory.TEST_ID)).willReturn(Optional.of(testEntity));

    // Act
    Optional<Guest> foundGuest = persistenceAdapter.get(BookingFactory.TEST_ID);

    // Assert
    Assertions.assertThat(foundGuest.isPresent()).isTrue();
  }
}