package com.koreait.koreaitsugang.web.dto.admin;

import lombok.Data;

@Data
public class CreditUserCountDto {

    private String searchValue;
    private int page;

    private String limit;

    private int count;
    private int index;

    public void setIndex(){
        index = (page - 1) * count;
    }
}
