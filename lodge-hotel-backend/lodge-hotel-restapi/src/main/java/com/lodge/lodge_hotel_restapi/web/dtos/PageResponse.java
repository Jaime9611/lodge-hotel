package com.lodge.lodge_hotel_restapi.web.dtos;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PageResponse<T> {
    private List<T> content;
    private int totalPages;
    private long totalElements;
    private boolean first;
    private boolean last;
    private boolean empty;
    private int size;
    private int number;
    private int numberOfElements;
}
