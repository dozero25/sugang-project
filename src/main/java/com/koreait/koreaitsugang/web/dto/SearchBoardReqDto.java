package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class SearchBoardReqDto {

    private int page;

    private String searchValue;


    private String limit;

    private int count;

    private int index;

    public void setIndex() {
        index = (page-1)*count;
    }

}
