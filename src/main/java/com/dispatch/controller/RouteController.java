package com.dispatch.controller;

import com.dispatch.dao.StationDao;
import com.dispatch.entity.Route;
import com.dispatch.entity.Station;
import com.dispatch.service.PriceService;
import com.dispatch.tempEntity.Price;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.DecimalFormat;
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

    public ResponseEntity<ArrayList<Price>> getPrice(@RequestBody List<Route> inputs) throws Exception {
        DecimalFormat df = new DecimalFormat("#.##");

        ArrayList<String> jsonArray = new ArrayList<>();
        double MIN_PRICE = 1000000000.0;
        double MIN_TIME = 1000000000.0; //TBD

        // loop over once for time and price, and their min max.
        for (Route input: inputs) {
            int type = input.getDeliverType();
            Station station = stationDao.getStationByName(input.getStationName());
            //get price and set time:
            if (type == 2) {
                double distance1 = priceService.distance(station.getLatitude(),station.getLongitude(),
                        input.getPickUpGeoX(), input.getPickUpGeoY());
                double distance2 = priceService.distance(input.getPickUpGeoX(),input.getPickUpGeoY(),
                        input.getPutDownGeoX(),input.getPutDownGeoY());
                double price = priceService.priceCalculator(distance1 + distance2, type);
                int time1 = priceService.timeCalculator(distance1);
                int time2 = priceService.timeCalculator(distance2);
                input.setTotalTime(time1 + time2);
                input.setPrice(Math.round(price * 100.0) / 100.0);
                input.setDistance(distance1 + distance2);
                input.setTimeFromStationToPickUpAddress(time1);
                input.setTimeFromPickUpAddressToPutDownAddress(time2);
            } else if (type == 1) {
                input.setTotalTime(input.getTimeFromStationToPickUpAddress() +
                        input.getTimeFromPickUpAddressToPutDownAddress());
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

        ArrayList<Price> toReturn = new ArrayList<>();
        // loop over twice to put tage on
        for (Route input: inputs) {
            Price temp = new Price(input.getPrice(), null,
                    null, String.valueOf(input.getTimeFromStationToPickUpAddress()),
                    String.valueOf(input.getTimeFromPickUpAddressToPutDownAddress()),
                    String.valueOf(df.format(input.getDistance())),
                    String.valueOf(input.getDeliverType()),
                    String.valueOf(input.getStationName()));

            if (input.getTotalTime() == MIN_TIME) {
                temp.tag1 = "Fastest";
            }
            if (input.getPrice() == MIN_PRICE) {
                temp.tag2 = "Cheapest";
            }
            toReturn.add(temp);
        }

        return new ResponseEntity<ArrayList<Price>>(toReturn, HttpStatus.OK);
    }


}
