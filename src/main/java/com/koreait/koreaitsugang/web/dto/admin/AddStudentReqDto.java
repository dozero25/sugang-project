package com.koreait.koreaitsugang.web.dto.admin;

import com.koreait.koreaitsugang.entity.ProfessorDtl;
import com.koreait.koreaitsugang.entity.StudentDtl;
import lombok.Data;

import javax.validation.constraints.Email;
import java.util.List;

@Data
public class AddStudentReqDto {
    private int userId;

    private String username;

    private String password;

    private String name;

    private String phone;

    private String birthDate;

    @Email
    private String email;

    private String address;

    private String departmentNumber;

    private int grade;

    private List<StudentDtl> studentDtl;
}
