package com.dispatch.controller;

import com.dispatch.entity.User;
import com.dispatch.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class SignupController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> signup(@RequestBody User user, BindingResult result) throws JsonProcessingException {
        if (result.hasErrors()) {
            return null;
        }
        return userService.addUser(user);

    }

}
