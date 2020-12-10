package com.dispatch.controller;

import com.dispatch.entity.Box;
import com.dispatch.service.OrderOptionService;
import com.fasterxml.jackson.annotation.JsonProperty;
//import com.dispatch.service.OrderOptionService.StationAvailability;

import com.dispatch.tempEntity.StationAvailability;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class InputController {

    @Autowired
    OrderOptionService orderOptionService;

    @RequestMapping(value = "/input", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ArrayList<StationAvailability>> userInput(@RequestBody Box box, BindingResult result) throws JsonProcessingException {
        if (result.hasErrors()) {
            return null;
        }
        int size = box.getSize();
        double weight = box.getWeight();
        String[] feature = box.getFeature();
        return orderOptionService.availabilityCheck(size, weight, feature);
    }

}
