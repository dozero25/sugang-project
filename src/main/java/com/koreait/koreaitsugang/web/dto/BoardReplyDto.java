package com.koreait.koreaitsugang.web.dto;

import lombok.Data;

@Data
public class BoardReplyDto {
    private int boardId;
    private int userId;
    private String name;
    private String boardReply;
    private int boardReplyFir;
    private int boardReplySec;
    private int boardReplyThi;
}
