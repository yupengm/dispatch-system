package com.dispatch.tempEntity;

public class Price {
    public Price(Double price, String tag1, String tag2, String time, String distance, String type, String stationName) {
        this.price = price;
        this.tag1 = tag1;
        this.tag2 = tag2;
        this.time = time;
        this.distance = distance;
        this.type = type;
        this.stationName = stationName;
    }

    public Double price;
    public String tag1;
    public String tag2;
    public String time;
    public String distance;
    public String type;
    public String stationName;
}