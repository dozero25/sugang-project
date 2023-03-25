package com.koreait.koreaitsugang.web.dto.admin;

import com.koreait.koreaitsugang.entity.StudentDtl;
import lombok.Data;

import javax.validation.constraints.Email;
import java.util.List;

@Data
public class UpdateStudentReqDto {

    private int userId;

    private String username;

    private String password;

    private String name;

    private String phone;

    @Email
    private String email;

    private String address;

    private int grade;

    private String birthDate;

    private int departmentNumber;

    private List<StudentDtl> studentDtl;

}
