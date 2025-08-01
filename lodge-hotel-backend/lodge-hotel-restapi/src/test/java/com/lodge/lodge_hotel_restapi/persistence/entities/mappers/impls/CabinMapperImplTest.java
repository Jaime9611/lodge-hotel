package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import com.lodge.lodge_hotel_restapi.domain.Cabin;
import com.lodge.lodge_hotel_restapi.persistence.entities.CabinEntity;
import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.CabinMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class CabinMapperImplTest {

    private final String TEST_NAME = "Test Cabin";
    private final BigDecimal TEST_PRICE = BigDecimal.valueOf(200);
    private final Long TEST_ID = 1L;

    CabinMapper cabinMapper;

    @BeforeEach
    void setUp() {
        cabinMapper = new CabinMapperImpl();
    }

    @Test
    void testNullEntityReturnsNull() {
        assertThat(cabinMapper.cabinEntityToCabin(null)).isNull();
    }

    @Test
    void testEntityToDomain() {
        // Arrange
        CabinEntity entity = CabinEntity.builder()
                .id(TEST_ID)
                .name(TEST_NAME)
                .price(TEST_PRICE)
                .build();

        // Act
        Cabin domainResult = cabinMapper.cabinEntityToCabin(entity);

        // Assert
        assertThat(domainResult.getId()).isEqualTo(TEST_ID);
        assertThat(domainResult.getName()).isEqualTo(TEST_NAME);
        assertThat(domainResult.getPrice()).isEqualTo(TEST_PRICE);
    }

    @Test
    void testNullDomainReturnsNull() {
        assertThat(cabinMapper.cabinToCabinEntity(null)).isNull();
    }
}