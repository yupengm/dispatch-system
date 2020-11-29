package com.dispatch.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public JSONObject login(@ModelAttribute User user, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        }

        return loginService.getLogin(user);

//        String res = loginService.getLogin(user);
//        if (res != null) {
//            return ResponseEntity.status(HttpStatus.OK).body("ok");
//        }
//
//        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
//                .body("email address does not exist / password incorrect");

    }

}
