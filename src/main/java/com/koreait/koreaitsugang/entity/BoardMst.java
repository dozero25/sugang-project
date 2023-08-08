package com.koreait.koreaitsugang.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BoardMst {
    private int boardId;
    private String boardSubject;
    private int userId;
    private String boardContent;
    private int boardVisit;
    private String boardUploadName;
    private int boardUploadSize;
    private String boardUploadTrans;
    private LocalDate boardRegDate;
    private int boardGrp;
}
