package com.dispatch.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SignupController {

    @Autowired
    private SignupService signupService;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public JSONObject signup(@ModelAttribute Customer customer, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        }
        return signupService.validSignup(customer);

//        JSONObject res = signupService.validSignup(customer);
//        if (res != null) {
//            return ResponseEntity.status(HttpStatus.OK).body("ok");
//        }
//        return ResponseEntity.status(HttpStatus.FORBIDDEN)
//                .body("user already exists");
    }

}
