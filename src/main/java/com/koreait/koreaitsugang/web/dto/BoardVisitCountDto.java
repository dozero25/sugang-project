package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

@Data
public class BoardVisitCountDto {
    private int boardId;
    private int boardVisit;

    public void countVisit(){
        boardVisit = boardVisit +1;
    }

}
