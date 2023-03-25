package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

@Data
public class UserImageDto {
    private int userId;
    private int imageId;
    private String username;
    private String saveName;
    private String originName;
}
