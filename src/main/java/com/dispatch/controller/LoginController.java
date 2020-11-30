package com.dispatch.controller;

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
    private CustomerService customerService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public JSONObject login(@ModelAttribute HashMap<String, String> user, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        }

        return customerService.loginCustomer(user.get("email"), user.get("password"));

    }

}
