package com.koreait.koreaitsugang.web.dto.admin;

import lombok.Data;

import javax.validation.constraints.Email;

@Data
public class UpdateUserReqDto {

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

    private String category;

    private int departmentNumber;

}
