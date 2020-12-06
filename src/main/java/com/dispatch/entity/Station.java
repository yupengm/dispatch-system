package com.dispatch.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "station")
public class Station implements Serializable {
    private static final long serialVersionUID = 2771531852204068105L;

    @Id
    private String name;

    private double latitude;

    private double longitude;

    private int droneAvailable;

    private int robotAvailable;




}
