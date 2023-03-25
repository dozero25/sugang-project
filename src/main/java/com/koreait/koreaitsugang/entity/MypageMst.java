package com.koreait.koreaitsugang.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MypageMst {
    private int userId;
    private String username;
    private String name;
    private String collegeName;
    private String category;
    private String birthDate;
    private String phone;
    private String email;
    private String address;
    private int grade;
}
