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

    private String emailId;

    private String startTime;

    private String endTime;

    private String timeFromStationToPickUpAddress;

    private String timeFromPickUpAddressToPutDownAddress;


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



}
