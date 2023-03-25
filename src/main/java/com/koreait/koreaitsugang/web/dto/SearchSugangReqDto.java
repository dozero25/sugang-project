package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class SearchSugangReqDto {

    private int page;

    private String searchValue;

    private List<String> classification;

    private String limit;

    private int count;

    private int userId;

    private int index;

    public void setIndex() {
        index = (page-1)*count;
    }

}
