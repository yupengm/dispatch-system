package com.dispatch.controller;

import com.dispatch.dao.StationDao;
import com.dispatch.entity.Route;
import com.dispatch.entity.Station;
import com.dispatch.service.PriceService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class RouteController {

    @Autowired
    PriceService priceService;

    @Autowired
    StationDao stationDao;

    // Version 2.0
//    @RequestMapping(value = "/getPrice", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity<String> getPrice(@RequestBody HashMap<String,String> request){
//
//
//    }


    // Version 1. Simple return the price by mapping to an entity
    // need construction
    @RequestMapping(value = "/getPrice", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ArrayList<String>> getPrice(@RequestBody List<Route> inputs) throws Exception {
        ArrayList<String> jsonArray = new ArrayList<>();
        double MIN_PRICE = 1000000000.0;
        double MIN_TIME = 1000000000.0; //TBD

        // loop over once for time and price, and their minimun
        for (Route input: inputs) {
            int type = input.getDeliverType();
            Station station = stationDao.getStationByName(input.get());

            //get price in the following:
            if (type == 2) {
                double distance1 = priceService.distance(station.getLatitude(),station.getLongitude(),
                        input.getPickUpGeoX(), input.getPickUpGeoY());
                double distance2 = priceService.distance(input.getPickUpGeoX(),input.getPickUpGeoY(),
                        input.getPickUpGeoX(),input.getPickUpGeoY());
                double distance = distance1 + distance2;
                double price = priceService.priceCalculator(distance, type);
                double time = priceService.timeCalculator(distance);
                input.setPrice(Math.round(price * 100.0) / 100.0);
                input.setTotalTime(Math.round(time * 100.0) / 100.0);
            } else if (type == 1) {
                double price = priceService.priceCalculator(input.getDistance(), type);
                input.setPrice(Math.round(price * 100.0) / 100.0);
            } else {
                input.setMessage("Wrong Deliver Type Provided.");
            }

            // get lowest time and price
            if (input.getTotalTime() <= MIN_TIME) {
                MIN_TIME = input.getTotalTime();
            }
            if (input.getPrice() <= MIN_PRICE) {
                MIN_PRICE = input.getPrice();
            }

        }

        // loop over twice
        for (Route input: inputs) {
            Map<String, String> toReturn = new HashMap<>();
            toReturn.put("price", String.valueOf(input.getPrice()));
            toReturn.put("time", String.valueOf(input.getTotalTime()));
            toReturn.put("tag1", null);
            toReturn.put("tag2", null);
            if (input.getTotalTime() == MIN_TIME) {
                toReturn.put("tag1", "Fastest");
            }
            if (input.getPrice() == MIN_PRICE) {
                toReturn.put("tag2", "Cheapest");
            }
            String json = new ObjectMapper().writeValueAsString(toReturn);
            jsonArray.add(json);
        }

        return new ResponseEntity<ArrayList<String>>(jsonArray, HttpStatus.OK);
    }

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
