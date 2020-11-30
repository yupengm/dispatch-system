package com.dispatch.controller;

import com.dispatch.service.OrderOptionService;
import com.fasterxml.jackson.annotation.JsonProperty;
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

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class InputController {

    @Autowired
    OrderOptionService orderOptionService;

    @RequestMapping(value = "/input", method = RequestMethod.POST)
    public JSONObject userInput(@RequestBody UserInput userInput, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        }
        int size = userInput.getSize();
        int weight = userInput.getWeight();
        String[] feature = userInput.getFeature();
        return orderOptionService.availabilityCheck(size, weight, feature);
    }

    static class UserInput {
        private int size;
        private int weight;
        private String[] feature;
        @JsonProperty("declared_value")
        private int declaredValue;

        public int getSize() {
            return size;
        }

        public void setSize(int size) {
            this.size = size;
        }

        public int getWeight() {
            return weight;
        }

        public void setWeight(int weight) {
            this.weight = weight;
        }

        public String[] getFeature() {
            return feature;
        }

        public void setFeature(String[] feature) {
            this.feature = feature;
        }

        public int getDeclaredValue() {
            return declaredValue;
        }

        public void setDeclared_value(int declaredValue) {
            this.declaredValue = declaredValue;
        }
    }

}
