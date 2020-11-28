package com.dispatch.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class InputController {

    @Autowired
    InputService inputService;

    @RequestMapping(value = "/input", method = RequestMethod.POST)
    public JSONObject userInput(@RequestBody Box box, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        }

        return inputService.validOrder(box);
    }
}
