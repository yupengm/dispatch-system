package com.dispatch.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;


@Entity
@Table(name = "orders")
public class Order implements Serializable {
    private static final long serialVersionUID = 6571020025726257848L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String startTime;

    private String endTime;

    private double totalWeight;

    private double price;

    private String deliverType;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Route route;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Box box;

    @ManyToOne
    private Station station;

    @ManyToOne
    private PickUpAddress pickUpAddress;

    @ManyToOne
    private PutDownAddress putDownAddress;

    @ManyToOne
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public double getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(double totalWeight) {
        this.totalWeight = totalWeight;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDeliverType() {
        return deliverType;
    }

    public void setDeliverType(String deliverType) {
        this.deliverType = deliverType;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Box getBox() {
        return box;
    }

    public void setBox(Box box) {
        this.box = box;
    }

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    public PickUpAddress getPickUpAddress() {
        return pickUpAddress;
    }

    public void setPickUpAddress(PickUpAddress pickUpAddress) {
        this.pickUpAddress = pickUpAddress;
    }

    public PutDownAddress getPutDownAddress() {
        return putDownAddress;
    }

    public void setPutDownAddress(PutDownAddress putDownAddress) {
        this.putDownAddress = putDownAddress;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
