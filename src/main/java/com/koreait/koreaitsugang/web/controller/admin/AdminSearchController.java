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

    @GetMapping("/usersearch")
    public String userInformation(){
        return "admin/user/information";
    }

    @GetMapping("/userregister")
    public String userRegister(){
        return "admin/user/register";
    }

    @GetMapping("/usersearch/{username}")
    public String userModifity(@PathVariable String username){
        return "admin/user/modify";
    }

    @GetMapping("/professorregister")
    public String professorRegister() {
        return "admin/professor/register";
    }

    @GetMapping("/search")
    public String sugangInformation(){
        return "admin/sugang/information";
    }

    @GetMapping("/sugang")
    public String sugangRegister(){
        return "admin/sugang/register";
    }

    @GetMapping("/sugang/{subjectCode}")
    public String sugangModify(@PathVariable int subjectCode) {
        return "admin/sugang/modification";
  }

    @GetMapping("/creditsearch")
    public String creditinfo(){ return "admin/credit/creditinfo";}

    @GetMapping("/creditregister")
    public String creditreg(){ return "admin/credit/creditreg";}


}
