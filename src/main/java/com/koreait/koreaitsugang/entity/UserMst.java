package com.koreait.koreaitsugang.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserMst {
    private int userId;

    private String category;

    private String username;

    private String password;

    private String name;

    private String phone;

    private String birthDate;

    private String email;

    private String address;

    private int departmentNumber;

    private List<RoleDtl> roleDtl;
}

