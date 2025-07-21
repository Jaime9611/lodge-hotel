package com.lodge.lodge_hotel_restapi.domain;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
class CabinTest {

    @Test
    void testGettersAndSetters() {
        Cabin myCabin = Cabin.builder().build();

        myCabin.setName("Test Name");

        BigDecimal newPrice = new BigDecimal("10.50");
        myCabin.setPrice(newPrice);

        assertEquals("Test Name", myCabin.getName());
        assertEquals(new BigDecimal("10.50"), myCabin.getPrice());

    }
  
}