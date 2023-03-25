package com.koreait.koreaitsugang.web.dto.admin;

import lombok.Data;

import java.util.List;

@Data
public class DeleteUserReqDto {
    private List<String> usernames;
}
