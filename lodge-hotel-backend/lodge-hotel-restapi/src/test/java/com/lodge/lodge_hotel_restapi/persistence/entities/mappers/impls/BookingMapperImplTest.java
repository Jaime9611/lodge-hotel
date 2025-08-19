package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.domain.Guest;
import com.lodge.lodge_hotel_restapi.factories.BookingFactory;
import com.lodge.lodge_hotel_restapi.factories.CabinFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.GuestEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.BookingMapper;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.CabinMapper;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.GuestMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class BookingMapperImplTest {

  BookingMapper bookingMapper;

  @Mock
  CabinMapper cabinMapper;

  @Mock
  GuestMapper guestMapper;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    bookingMapper = new BookingMapperImpl(cabinMapper, guestMapper);
  }

  @Test
  void testNullEntityReturnsNull() {
    assertThat(bookingMapper.bookingEntityToBooking(null)).isNull();
  }

  @Test
  void testEntityToDomain() {
    // Arrange
    BookingEntity entity = BookingFactory.createSingleBookingEntity();

    given(cabinMapper.cabinEntityToCabin(any(CabinEntity.class))).willReturn(
        CabinFactory.createSingleCabin());
    given(guestMapper.guestEntityToGuest(any(GuestEntity.class))).willReturn(
        Guest.builder().build());

    // Act
    Booking domainResult = bookingMapper.bookingEntityToBooking(entity);

    // Assert
    assertThat(domainResult.getId()).isEqualTo(entity.getId());
  }

  @Test
  void testNullDomainReturnsNull() {
    assertThat(bookingMapper.bookingToBookingEntity(null)).isNull();
  }

  @Test
  void testDomainToEntity() {
    // Arrange
    Booking domain = BookingFactory.createSingleBooking();

    given(cabinMapper.cabinToCabinEntity(any(Cabin.class))).willReturn(
        CabinFactory.createSingleCabinEntity());
    given(guestMapper.guestToGuestEntity(any(Guest.class))).willReturn(
        GuestEntity.builder().build());

    // Act
    BookingEntity entityResult = bookingMapper.bookingToBookingEntity(domain);

    // Assert
    assertThat(entityResult.getId()).isEqualTo(domain.getId());
  }

}