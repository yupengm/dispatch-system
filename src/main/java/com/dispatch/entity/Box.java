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

    private int size;

    private double weight;

    private String[] feature;

    @JsonProperty("declared_value")
    private int declaredValue;


    @OneToOne(mappedBy = "box")
    private Order order;


}
