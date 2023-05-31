package com.koreait.koreaitsugang.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {

    @GetMapping("/login")
    public String loginPage() {
        return "user/login";
    }


    @GetMapping("/login/error")
    public String loginError() {
        return "user/login_error";
    }

    @GetMapping("/mypage")
    public String mypage() {
        return "mypage";
    }
}

