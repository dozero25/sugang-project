package com.koreait.koreaitsugang.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminSearchController {

    @GetMapping("/usersearch")
    public String user_information(){
        return "admin/user/information";
    }

    @GetMapping("/userregister")
    public String user_register(){
        return "admin/user/register";
    }

    @GetMapping("/professorregister")
    public String professor_register() {
        return "admin/professor/register";
    }

    @GetMapping("/search")
    public String sugang_information(){
        return "admin/sugang/information";
    }

    @GetMapping("/sugang")
    public String sugang_register(){
        return "admin/sugang/register";
    }

    @GetMapping("/sugang/{subjectCode}")
    public String sugang_modify(@PathVariable int subjectCode) {
        return "admin/sugang/modification";
  }

}
