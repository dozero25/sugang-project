package com.koreait.koreaitsugang.web.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminSearchController {

    @GetMapping("/usersearch")
    public String user_information(){
        return "admin/user_information";
    }

    @GetMapping("/userregister")
    public String user_register(){
        return "admin/user_register";
    }

    @GetMapping("/professorregister")
    public String professor_register() {
        return "admin/professor_register";
    }


    @GetMapping("/search")
    public String sugang_information(){
        return "admin/sugang_information";
    }

    @GetMapping("/sugang")
    public String sugang_register(){
        return "admin/sugang_register";
    }

    @GetMapping("/sugang/{subjectCode}")
    public String sugang_modify(@PathVariable int subjectCode) {
        return "admin/sugang_modification";
  }

}
