package com.koreait.koreaitsugang.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping({"","/announcement"})
    public String index(){
        return "announcement";
    }
}
