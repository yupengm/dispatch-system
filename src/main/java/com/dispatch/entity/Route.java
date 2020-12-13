package com.dispatch.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

import javax.persistence.*;


@Entity
@Table(name = "route")
public class Route implements Serializable {
    private static final long serialVersionUID = 2991531852204068105L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private double distance;

    public double totalTime;

    public double price;

    private int deliverType;

    private double pickUpGeoX;

    private double pickUpGeoY;

    private double putDownGeoX;

    private double putDownGeoY;

    @JsonProperty("time1")
    private int timeFromStationToPickUpAddress;

    @JsonProperty("time2")
    private int timeFromPickUpAddressToPutDownAddress;

    @Lob
    private String routePoly;

    private String stationName;

    private String message;


    @OneToOne(mappedBy = "route")
    private Order order;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(double totalTime) {
        this.totalTime = totalTime;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getDeliverType() {
        return deliverType;
    }

    public void setDeliverType(int deliverType) {
        this.deliverType = deliverType;
    }

    public double getPickUpGeoX() {
        return pickUpGeoX;
    }

    public void setPickUpGeoX(double pickUpGeoX) {
        this.pickUpGeoX = pickUpGeoX;
    }

    public double getPickUpGeoY() {
        return pickUpGeoY;
    }

    public void setPickUpGeoY(double pickUpGeoY) {
        this.pickUpGeoY = pickUpGeoY;
    }

    public double getPutDownGeoX() {
        return putDownGeoX;
    }

    public void setPutDownGeoX(double putDownGeoX) {
        this.putDownGeoX = putDownGeoX;
    }

    public double getPutDownGeoY() {
        return putDownGeoY;
    }

    public void setPutDownGeoY(double putDownGeoY) {
        this.putDownGeoY = putDownGeoY;
    }

    public String getRoutePoly() {
        return routePoly;
    }

    public void setRoutePoly(String route) {
        this.routePoly = route;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public int getTimeFromStationToPickUpAddress() {
        return timeFromStationToPickUpAddress;
    }

    public void setTimeFromStationToPickUpAddress(int timeFromStationToPickUpAddress) {
        this.timeFromStationToPickUpAddress = timeFromStationToPickUpAddress;
    }

    public int getTimeFromPickUpAddressToPutDownAddress() {
        return timeFromPickUpAddressToPutDownAddress;
    }

    public void setTimeFromPickUpAddressToPutDownAddress(int timeFromPickUpAddressToPutDownAddress) {
        this.timeFromPickUpAddressToPutDownAddress = timeFromPickUpAddressToPutDownAddress;
    }
}
