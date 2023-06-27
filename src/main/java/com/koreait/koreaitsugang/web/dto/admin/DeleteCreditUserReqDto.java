package com.koreait.koreaitsugang.web.dto.admin;

import lombok.Data;

import java.util.List;

@Data
public class DeleteCreditUserReqDto {
    public List<Integer> userIds;
}
