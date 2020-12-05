package com.dispatch.controller;

import com.dispatch.entity.Route;
import com.dispatch.entity.Station;
import com.dispatch.service.RouteService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
public class RouteController {

    @Autowired
    RouteService routeService;

    // Version 2.0
//    @RequestMapping(value = "/getPrice", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity<String> getPrice(@RequestBody HashMap<String,String> request){
//
//
//    }


    // Version 1. Simple return the price by mapping to an entity
    // need construction
//    @RequestMapping(value = "/getPrice", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity<String> getPrice(@RequestBody Route route){
//         double distance = route.getDistance();
//         double time = route.getTotalTime();;
//         route.
//         return
//    }

//    @RequestMapping(value = "/getRoute", method = RequestMethod.POST)
//    public JSONObject getRoute(@RequestBody) {
//
//        int[] methodCode;
//        double[] distance;
//        String[] deliverTime;
//
//        double[] price = new double[6];
//        for (int i = 0; i < 6; i++) {
//            price[i] = routeService.priceCalulator(distance[i], methodCode[i]);
//        }
//        // sorting price[]
//
//        return

}
