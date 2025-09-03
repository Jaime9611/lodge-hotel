package com.lodge.lodge_hotel_restapi.persistence.entities.mappers.impls;

import static org.assertj.core.api.Assertions.assertThat;

import com.lodge.lodge_hotel_restapi.persistence.entities.mappers.PageMapper;
import com.lodge.lodge_hotel_restapi.web.dtos.PageResponse;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

class PageMapperImplTest {

   PageMapper pageMapper;

  @BeforeEach
  void setUp() {
    pageMapper = new PageMapperImpl();
  }

  @Test
  void testNullPageReturnsNull() {
    assertThat(pageMapper.pagetoPageResponse(null)).isNull();
  }

  @Test
  void testPageToPageResponse() {
    // Arrange
    String text_content1 = "MY TEST TEXT";
    String text_content2 = "MY TEST TEXT";
    List<String> testList =  Arrays.asList(text_content1, text_content2);
    Pageable pageable = PageRequest.of(0, 1);
    long totalElements = 2;
    Page<String> page = new PageImpl<>(testList, pageable, totalElements );

    // Act
    PageResponse<String> result = pageMapper.pagetoPageResponse(page);

    // Assert
    assertThat(result.getContent().get(0)).isEqualTo(text_content1);
    assertThat(result.getContent().get(1)).isEqualTo(text_content2);
  }
}