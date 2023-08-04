package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

@Data
public class SearchBoardGrpReqDto {

    private int page;

    private int boardGrp;

    private String searchValue;

    private String limit;

    private int count;

    private int index;

    public void setIndex() {
        index = (page-1) * count;
    }

}
