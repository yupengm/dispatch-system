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


}
