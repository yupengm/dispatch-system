package com.dispatch.service;

import com.dispatch.dao.OrderDao;
import com.dispatch.entity.Order;
import com.dispatch.external.GoogleMapPolylineDecoder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.dispatch.service.OrderService.getStringResponseEntity;


@Service
public class TrackingService {
    //TODO:
    // Drone return current location.
    // robot return fraction.

    @Autowired
    private OrderDao orderDao;

    public ResponseEntity<String> trackOrder(int orderId) throws JsonProcessingException {
        Order order = orderDao.getOrderByOrderId(orderId);
        Map<String, String> toReturn = new HashMap<>();
        int status = getStatus(order.getStartTime(),order.getTimeFromStationToPickUpAddress(),
                order.getTimeFromPickUpAddressToPutDownAddress());
        int timeInterval = -1; // means delivered
        int timeElapsed = -1; // means delivered
        if (status == 0) {  // means from station to pickUpAddress
            timeElapsed = getTimeElapsed(order.getStartTime());
            timeInterval = order.getTimeFromStationToPickUpAddress();
        } else if (status == 1) {  // means from pickUpAddress to putDownAddress
            timeElapsed = getTimeElapsed(order.getStartTime()) - order.getTimeFromStationToPickUpAddress();
            timeInterval = order.getTimeFromPickUpAddressToPutDownAddress();
        }
        int type = order.getRoute().getDeliverType();
        if (type == 1 && timeInterval != -1) {
            double scale = getScale(timeElapsed, timeInterval);
            GoogleMapPolylineDecoder decoder = new GoogleMapPolylineDecoder();
            List<List<Double>> coordinates = decoder.decodePolyline(order.getRoute().getRoutePoly());
            int index = (int) (Math.round(coordinates.size() * scale)) - 1;
            toReturn.put("currentX",String.valueOf(coordinates.get(index).get(0)));
            toReturn.put("currentY",String.valueOf(coordinates.get(index).get(1)));
        } else if (type == 2 && timeInterval != -1) {
            double[] currentXY = trackDrone(timeElapsed,timeInterval,
                    order.getRoute().getPickUpGeoX(),
                    order.getRoute().getPickUpGeoY(),
                    order.getRoute().getPutDownGeoX(),
                    order.getRoute().getPutDownGeoY());
            toReturn.put("currentX",String.valueOf(currentXY[0]));
            toReturn.put("currentY",String.valueOf(currentXY[1]));
            toReturn.put("PickUpAddressX",String.valueOf(order.getRoute().getPickUpGeoX()));
            toReturn.put("PickUpAddressY",String.valueOf(order.getRoute().getPickUpGeoY()));
            toReturn.put("PutDownAddressX",String.valueOf(order.getRoute().getPutDownGeoX()));
            toReturn.put("PutDownAddressY",String.valueOf(order.getRoute().getPutDownGeoY()));
            toReturn.put("stationX",String.valueOf(order.getStation().getLatitude()));
            toReturn.put("stationY",String.valueOf(order.getStation().getLongitude()));

        }

        toReturn.put("status",String.valueOf(status));
        toReturn.put("orderNumber",String.valueOf(order.getId()));
        toReturn.put("email", order.getUser().getEmailId());
        toReturn.put("price", String.valueOf(order.getRoute().getPrice()));
        toReturn.put("station", String.valueOf(order.getStation().getStationName()));
        toReturn.put("type", String.valueOf(type));
        toReturn.put("weight", String.valueOf(order.getBox().getWeight()));
        toReturn.put("RoutePoly", String.valueOf(order.getRoute().getRoutePoly()));
//        toReturn.put("PickUpAddress",String.valueOf(order.getPickUpAddress()));//TODO
//        toReturn.put("PutDownAddress",String.valueOf(order.getPutDownAddress())); //TODO
        toReturn.put("StartTime",String.valueOf(order.getStartTime()));
        toReturn.put("EndTime",String.valueOf(order.getEndTime()));

        String json = new ObjectMapper().writeValueAsString(toReturn);
        return new ResponseEntity<String>(json, HttpStatus.OK);

//        toReturn.put("status", getStatus(order.getStartTime(), order.getStartTime(),order.getEndTime())); //TODO
    }

    // when save order, use getNowTime to save a String type time
    // when response to tracking, DAO get the String time, int time1 & time2, put them into getStatus -> get string type status

    // get current time in String format
    private String getNowTime(){
//        System.out.println(LocalDateTime.now());
        return LocalDateTime.now().toString();
    }

    // To get String type status for current order
    // time 1 is leg1 cost in seconds, so does time2
    private int getStatus(String StartTime, int time1, int time2) {

        Instant start = Instant.parse(StartTime + "z");
        Instant now = Instant.parse(this.getNowTime() + "z");
        //        Instant start = Instant.parse("2015-01-29T18:00:00.0z");
        //        +z to parse as standard

        Duration timeElapsed = Duration.between(start, now);
//        System.out.println(timeElapsed.toMillis());

        if(timeElapsed.toMillis() < time1*1000) {
//            return "On the way to pick up";
            return 0;

        } else if(timeElapsed.toMillis() < (time1+time2)*1000) {
//            return "Shipping to destination";
            return 1;
        } else {
//            return "Completed";
            return 2;
        }
    }

    private double[] trackDrone(int timeElapsed, int timeInterval, double geoLocation1X, double
            geoLocation1Y, double geoLocation2X, double
                                        geoLocation2Y) {
        double scale = getScale(timeElapsed, timeInterval);
        double diffY = geoLocation2Y - geoLocation1Y;
        double diffX = geoLocation2X - geoLocation1X;
        double[] currentLocationXY = {geoLocation1X + diffX * scale, geoLocation1Y + diffY * scale};
        return currentLocationXY;
    }

    private int getTimeElapsed(String fromTime) {
        Instant start = Instant.parse(fromTime + "z");
        Instant now = Instant.parse(this.getNowTime() + "z");
        //        Instant start = Instant.parse("2015-01-29T18:00:00.0z");
        //        +z to parse as standard
        Duration timeElapsed = Duration.between(start, now);
        return (int) (timeElapsed.toMillis()/1000);
    }

    private double getScale(int timeElapsed , int timeInterval) {
        double timeElapsedinSec = (double) (timeElapsed);
        double timeIntervalSec = (double) (timeInterval);
        double scaleLong = timeElapsedinSec / timeIntervalSec;
        double scale = Math.round(scaleLong * 100.0) / 100.0;
        return scale;
    }

}
