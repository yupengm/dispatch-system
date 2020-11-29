package com.dispatch.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;


@Entity
@Table(name = "box")
public class Box implements Serializable {
    private static final long serialVersionUID = 2881531852204068105L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String type;

    private double weight;

    private double length;

    private double width;

    private double height;

    private double declaredValue;

    private boolean fragileOrNot;

    private boolean batteryOrNot;

    private boolean liquidOrnot;

    @OneToOne(mappedBy = "box")
    private Order order;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getDeclaredValue() {
        return declaredValue;
    }

    public void setDeclaredValue(double declaredValue) {
        this.declaredValue = declaredValue;
    }

    public boolean isFragileOrNot() {
        return fragileOrNot;
    }

    public void setFragileOrNot(boolean fragileOrNot) {
        this.fragileOrNot = fragileOrNot;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public boolean isBatteryOrNot() {
        return batteryOrNot;
    }

    public void setBatteryOrNot(boolean batteryOrNot) {
        this.batteryOrNot = batteryOrNot;
    }

    public boolean isLiquidOrnot() {
        return liquidOrnot;
    }

    public void setLiquidOrnot(boolean liquidOrnot) {
        this.liquidOrnot = liquidOrnot;
    }
}
