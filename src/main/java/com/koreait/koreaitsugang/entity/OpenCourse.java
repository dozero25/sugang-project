package com.koreait.koreaitsugang.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OpenCourse {
    private String classification;

    private int subjectCode;

    private String subjectName;

    private int credit;

    private String professorName;

    private String lectureTime;

    private String building;

    private char remoteDivision;

    private int userId;

}
