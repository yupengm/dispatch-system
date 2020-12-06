package com.dispatch.entity;

import java.io.Serializable;

import javax.persistence.*;


@Entity
@Table(name = "route")
public class Route implements Serializable {
    private static final long serialVersionUID = 2991531852204068105L;

    public double time;

    public String message = null;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private double distance;

    private double totalTime;

    private String route;

    private int deliverType;

    public String stationName;

    @OneToOne(mappedBy = "route")
    private Order order;

//    @OneToOne
//    private PickUpAddress pickUpAddress;
//
//    @OneToOne
//    private PutDownAddress putDownAddress;

    private String routePoly;

    public double pickUpGeoX;

    public double pickUpGeoY;

    public double putDownGeoX;

    public double putDownGeoY;

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double price;

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

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public void setDeliverType(int deliverType) { this.deliverType = deliverType;}

    public int getDeliverType() {
        return this.deliverType;
    }

//    public void setStation(Station station) { this.station = station;}
//
//    public Station getStation() {return this.station;}

    public double getPickUpGeoX() {return this.pickUpGeoX;}

    public void setPickUpGeoX(double pickUpGeoX) {this.pickUpGeoX = pickUpGeoX;}

    public double getpickUpGeoY() {return this.pickUpGeoY;}

    public String getRoutePoly() {
        return routePoly;
    }

    public void setRoutePoly(String route) {
        this.routePoly = route;
    }

    public void setPickUpGeoY(double pickUpGeoY) {this.pickUpGeoY = pickUpGeoY;}

    public double getPutDownGeoX() {return this.putDownGeoX;}

    public void setPutDownGeoX(double putDownGeoX) {this.putDownGeoX = putDownGeoX;}

    public double getPutDownGeoY() {return this.putDownGeoY;}

    public void setPutDownGeoY(double putDownGeoY) {this.putDownGeoY = putDownGeoY;}

//    public void setPickUpAddress(PickUpAddress pickUpAddress) { this.pickUpAddress = pickUpAddress;}
//
//    public PickUpAddress getPickUpAddress() {return this.pickUpAddress;}
//
//    public void setPutDownAddress(PutDownAddress putDownAddress) { this.putDownAddress = putDownAddress;}
//
//    public PutDownAddress getPutDownAddress() {return this.putDownAddress;}
}
