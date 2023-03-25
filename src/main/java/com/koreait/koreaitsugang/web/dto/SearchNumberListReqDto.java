package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

@Data
public class SearchNumberListReqDto {

    private String classification;

    private String category;

    private String searchValue;
}
