package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class DeleteSubjectsReqDto {
    public List<Integer> subjectCodes;
}
