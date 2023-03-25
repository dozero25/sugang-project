package com.koreait.koreaitsugang.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SearchSubjectMst {
    private String classification;
    private int subjectCode;
    private int credit;
    private String professorName;
    private String building;
    private String lectureTime;
}
