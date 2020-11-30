package com.dispatch.controller;

import com.dispatch.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Controller
public class LoginController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public JSONObject login(@ModelAttribute HashMap<String, String> user, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        }

        return userService.loginUser(user.get("email"), user.get("password"));

    }

}
