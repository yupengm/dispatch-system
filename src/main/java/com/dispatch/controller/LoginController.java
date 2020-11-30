package com.dispatch.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;

@RestController
public class LoginController {

//    @Autowired
//    private CustomerService customerService;

    @RequestMapping("/login")
    @ResponseBody
    public JSONObject login(@RequestBody HashMap<String, String> user, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        }

//        return customerService.loginCustomer(user.get("email"), user.get("password"));
        return null;
    }

}
