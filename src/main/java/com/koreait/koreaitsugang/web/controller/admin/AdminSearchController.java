package com.koreait.koreaitsugang.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminSearchController {

    @GetMapping("/main")
    public String adminMain(){return "admin/adminmain";}

    @GetMapping("/user/search")
    public String userInformation(){
        return "admin/user/information";
    }

    @GetMapping("/user/reg")
    public String userRegister(){
        return "admin/user/register";
    }

    @GetMapping("/user/modi")
    public String userModifity(){
        return "admin/user/modify";
    }

    @GetMapping("/professorregister")
    public String professorRegister() {
        return "admin/professor/register";
    }

    @GetMapping("/sugang/search")
    public String sugangInformation(){
        return "admin/sugang/information";
    }

    @GetMapping("/sugang/reg")
    public String sugangRegister(){
        return "admin/sugang/register";
    }

    @GetMapping("/sugang/modi")
    public String sugangModify() {
        return "admin/sugang/modification";
  }

    @GetMapping("/creditsearch")
    public String creditinfo(){ return "admin/credit/creditinfo";}

    @GetMapping("/creditregister")
    public String creditreg(){ return "admin/credit/creditreg";}

    @GetMapping("/credit")
    public String creditModify() {
        return "admin/credit/creditmodify";
    }

}
