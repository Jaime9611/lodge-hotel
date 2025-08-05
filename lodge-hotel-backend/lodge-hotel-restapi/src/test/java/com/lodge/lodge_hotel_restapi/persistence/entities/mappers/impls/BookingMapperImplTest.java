package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import static org.assertj.core.api.Assertions.assertThat;

import com.lodge.lodge_hotel_restapi.domain.Booking;
import com.lodge.lodge_hotel_restapi.factories.BookingFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.BookingEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.BookingMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BookingMapperImplTest {

  BookingMapper bookingMapper;

  @BeforeEach
  void setUp() {
    bookingMapper = new BookingMapperImpl();
  }

  @Test
  void testNullEntityReturnsNull() {
    assertThat(bookingMapper.bookingEntityToBooking(null)).isNull();
  }

  @Test
  void testEntityToDomain() {
    // Arrange
    BookingEntity entity = BookingFactory.createSingleBookingEntity();

    // Act
    Booking domainResult = bookingMapper.bookingEntityToBooking(entity);

    // Assert
    assertThat(domainResult.getId()).isEqualTo(entity.getId());
    assertThat(domainResult.getName()).isEqualTo(entity.getName());
  }

  @Test
  void testNullDomainReturnsNull() {
    assertThat(bookingMapper.bookingToBookingEntity(null)).isNull();
  }

  @Test
  void testDomainToEntity() {
    // Arrange
    Booking domain = BookingFactory.createSingleBooking();

    // Act
    BookingEntity entityResult = bookingMapper.bookingToBookingEntity(domain);

    // Assert
    assertThat(entityResult.getId()).isEqualTo(domain.getId());
    assertThat(entityResult.getName()).isEqualTo(domain.getName());
  }

}