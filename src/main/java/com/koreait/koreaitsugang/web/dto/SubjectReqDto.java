package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@Data
public class SubjectReqDto {
    private int subjectCode;

    private int subjectYear;
    private int subjectSemester;
    private String collegeName;
    private String category;
    private int subjectGrade;
    private String classification;
    private String subjectName;
    private int subjectClass;
    private int credit;
    private int professorId;
    private String professorName;
    private String lectureTime;
    private String building;
    private int maxPerson;
}
