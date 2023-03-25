package com.koreait.koreaitsugang.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/account")
public class AccountController {

    @GetMapping("/login")
    public String login() {
        return "user/login";
    }

    @PostMapping("/login/error")
    public String loginError() {
        return "user/login_error";
    }

    @GetMapping("/mypage")
    public String mypage() {
        return "mypage";
    }
}

