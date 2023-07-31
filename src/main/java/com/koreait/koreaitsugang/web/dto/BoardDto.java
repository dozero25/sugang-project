package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BoardDto {
    private int boardId;
    private String boardSubject;
    private int userId;
    private String name;
    private String boardContent;
    private int boardVisit;
    private String boardUploadName;
    private int boardUploadSize;
    private String boardUploadTrans;
    private LocalDate boardRegDate;
    private int boardGrp;
}
