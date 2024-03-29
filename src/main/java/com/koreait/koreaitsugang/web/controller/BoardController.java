package com.koreait.koreaitsugang.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/board")
public class BoardController {

    @GetMapping("")
    public String board(){return "board/main";}

    @GetMapping("/view")
    public String boardView(){return "board/view";}

    @GetMapping("/write")
    public String boardWrite(){return "board/write";}

    @GetMapping("/update")
    public String boardupdate(){return "board/modify";}
}
