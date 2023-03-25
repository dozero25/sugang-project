package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

@Data
public class SearchSubjectReqDto {
    private String classification;
    private int subjectCode;
    private int credit;
    private String professorName;
    private String building;
    private String lectureTime;
}