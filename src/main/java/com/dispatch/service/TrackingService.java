package com.dispatch.service;

import org.springframework.stereotype.Service;

import java.time.*;


@Service
public class TrackingService {
    // when save order, use getNowTime to save a String type time
    // when response to tracking, DAO get the String time, int time1 & time2, put them into getStatus -> get string type status

    // get current time in String format
    private String getNowTime(){
//        System.out.println(LocalDateTime.now());
        return LocalDateTime.now().toString();
    }

    // To get String type status for current order
    // time 1 is leg1 cost in seconds, so does time2
    private String getStatus(String StartTime, int time1, int time2) {

        Instant start = Instant.parse(StartTime + "z");
        Instant now = Instant.parse(this.getNowTime() + "z");
        //        Instant start = Instant.parse("2015-01-29T18:00:00.0z");
        //        +z to parse as standard

        Duration timeElapsed = Duration.between(start, now);
//        System.out.println(timeElapsed.toMillis());

        if(timeElapsed.toMillis() < time1*1000) {
            return "On the way to pick up";
        } else if(timeElapsed.toMillis() < (time1+time2)*1000) {
            return "Shipping to destination";
        } else {
            return "Completed";
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
//
//    }
}
