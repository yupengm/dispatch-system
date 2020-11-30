package com.dispatch.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {
    @RequestMapping(value = "/ex/foos", method = RequestMethod.GET)
    public String getFoosBySimplePath() {
        return "Get some Foos";
    }
}
