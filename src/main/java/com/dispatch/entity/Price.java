package com.dispatch.entity;

public class Price {
    public Price(Double price, String tag1, String tag2, String time){
        this.price = price;
        this.tag1 = tag1;
        this.tag2 = tag2;
        this.time = time;
    }

    public Double price;
    public String tag1;
    public String tag2;
    public String time;
}
