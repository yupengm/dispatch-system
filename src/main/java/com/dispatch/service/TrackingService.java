package com.dispatch.service;

import com.dispatch.dao.OrderDao;
import com.dispatch.entity.Order;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.HashMap;
import java.util.Map;


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

//        toReturn.put("status", getStatus(order.getStartTime(), order.getStartTime(),order.getEndTime())); //TODO
        toReturn.put("email", order.getUser().getEmailId());
        toReturn.put("price", String.valueOf(order.getPrice()));
        toReturn.put("station", String.valueOf(order.getStation()));
        toReturn.put("type", order.getDeliverType());
        toReturn.put("size", String.valueOf(order.getBox())); //TODO: maybe abandon the box
        toReturn.put("weight", String.valueOf(order.getTotalWeight()));
        toReturn.put("PickUpAddress",String.valueOf(order.getPickUpAddress()));
        toReturn.put("PutDownAddress",String.valueOf(order.getPutDownAddress()));
        String json = new ObjectMapper().writeValueAsString(toReturn);
        return new ResponseEntity<String>(json, HttpStatus.OK);
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
    private double getStatus(String StartTime, int time1, int time2) {

        Instant start = Instant.parse(StartTime + "z");
        Instant now = Instant.parse(this.getNowTime() + "z");
        //        Instant start = Instant.parse("2015-01-29T18:00:00.0z");
        //        +z to parse as standard

        Duration timeElapsed = Duration.between(start, now);
//        System.out.println(timeElapsed.toMillis());

        if(timeElapsed.toMillis() < time1*1000) {
//            return "On the way to pick up";
            return 0+(timeElapsed).toMillis() /time1 * 1000;

        } else if(timeElapsed.toMillis() < (time1+time2)*1000) {
//            return "Shipping to destination";
//            return 1;
            return 1+(timeElapsed).toMillis() /time2 * 1000;
        } else {
//            return "Completed";
            return 2;
        }
    }

    //test
//    public static void main(String[] args) throws InterruptedException {
//
//        TrackingService a= new TrackingService();
//
//        String now = a.getNowTime();
//        Thread.sleep(2000);
//        System.out.println(a.getStatus(now,1,5)); // on the way pick up
//        System.out.println(a.getStatus(now,3,5)); // sending
//        Thread.sleep(2000);
//        System.out.println(a.getStatus(now,1,2)); // complete
//    }
}
