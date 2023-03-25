package com.koreait.koreaitsugang.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentMst {
    private  int departmentNumber;
    private  int collegeNumber;
    private String departmentName;
    private  String departmentPhone;
    private String building;
}
