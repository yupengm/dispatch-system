package com.dispatch.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    private double weight;

    private int size;

    private String[] feature;


    @JsonProperty("declared_value")
    private int declaredValue;

    @OneToOne(mappedBy = "box")
    private Order order;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String[] getFeature() {
        return feature;
    }

    public void setFeature(String[] feature) {
        this.feature = feature;
    }

    public int getDeclaredValue() {
        return declaredValue;
    }

    public void setDeclaredValue(int declaredValue) {
        this.declaredValue = declaredValue;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
