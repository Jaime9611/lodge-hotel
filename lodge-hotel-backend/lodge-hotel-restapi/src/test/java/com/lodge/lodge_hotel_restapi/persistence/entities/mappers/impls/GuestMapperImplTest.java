package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import static org.assertj.core.api.Assertions.assertThat;

import com.lodge.lodge_hotel_restapi.domain.Guest;
import com.lodge.lodge_hotel_restapi.factories.GuestFactory;
import com.lodge.lodge_hotel_restapi.persistence.entities.GuestEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.GuestMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GuestMapperImplTest {

  GuestMapper guestMapper;

  @BeforeEach
  void setUp() {
    guestMapper = new GuestMapperImpl();
  }

  @Test
  void testNullEntityReturnsNull() {
    assertThat(guestMapper.guestEntityToGuest(null)).isNull();
  }

  @Test
  void testEntityToDomain() {
    // Arrange
    GuestEntity entity = GuestFactory.createSingleGuestEntity();

    // Act
    Guest domainResult = guestMapper.guestEntityToGuest(entity);

    // Assert
    assertThat(domainResult.getId()).isEqualTo(entity.getId());
    assertThat(domainResult.getFullName()).isEqualTo(entity.getFullName());
    assertThat(domainResult.getEmail()).isEqualTo(entity.getEmail());
    assertThat(domainResult.getCountry()).isEqualTo(entity.getCountry());
    assertThat(domainResult.getNationalId()).isEqualTo(entity.getNationalId());
  }

  @Test
  void testNullDomainReturnsNull() {
    assertThat(guestMapper.guestToGuestEntity(null)).isNull();
  }

  @Test
  void testDomainToEntity() {
    // Arrange
    Guest domain = GuestFactory.createSingleGuest();

    // Act
    GuestEntity entityResult = guestMapper.guestToGuestEntity(domain);

    // Assert
    assertThat(entityResult.getId()).isEqualTo(domain.getId());
    assertThat(entityResult.getFullName()).isEqualTo(domain.getFullName());
    assertThat(entityResult.getEmail()).isEqualTo(domain.getEmail());
    assertThat(entityResult.getCountry()).isEqualTo(domain.getCountry());
    assertThat(entityResult.getNationalId()).isEqualTo(domain.getNationalId());
  }
}