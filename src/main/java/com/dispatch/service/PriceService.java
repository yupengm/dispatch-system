package com.dispatch.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class PriceService {
    // input: list of hashmap: length = routes num

    //need to return
    //      station:name
    //		equipment:
    //		price:
    //		time:

    //THis method should be used by controller.

    public double priceCalculator(double distance, int methodCode) throws Exception{
        final double robotPricePerKm = 2;
        final double dronePricePerKm = 3;

        if (methodCode == 1){
            double price = distance/1000 * robotPricePerKm;
            return price;
        } else if (methodCode == 2){
            double price = distance/1000 * dronePricePerKm;
            return price;
        } else {
            throw new ArithmeticException("wrong method code provided.");
        }

    }


    // use for drone only
    public int timeCalculator(double distance) throws Exception{
        final double MPS = 20; // meter per second
        int time = (int) (distance /MPS);
        return time;// convert hour to seconds
    }


    public static double distance(double lat1, double lon1, double lat2, double lon2) {

        final int R = 6371; // Radius of the earth

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        distance = Math.pow(distance, 2);

        return Math.sqrt(distance);
    }


}
