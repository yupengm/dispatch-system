package com.dispatch.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;


@Entity
@Table(name = "route")
public class Route implements Serializable {
    private static final long serialVersionUID = 2991531852204068105L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private double distance;

    private double totalTime;

    private double price;

    private int deliverType;

    private double pickUpGeoX;

    private double pickUpGeoY;

    private double putDownGeoX;

    private double putDownGeoY;

    private String route;

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

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
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
}
