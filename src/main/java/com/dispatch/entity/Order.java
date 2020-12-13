package com.dispatch.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    @JsonProperty("email")
    private String emailId;

    private String startTime;

    private String endTime;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Payment payment;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Route route;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Box box;

    @ManyToOne
    private Station station;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private User user;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private PickUpAddress pickUpAddress;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private PutDownAddress putDownAddress;

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }
}
