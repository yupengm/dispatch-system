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
    private String stationName;

    private double latitude;

    private double longitude;

    private int droneAvailable;

    private int robotAvailable;


    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public int getDroneAvailable() {
        return droneAvailable;
    }

    public void setDroneAvailable(int droneAvailable) {
        this.droneAvailable = droneAvailable;
    }

    public int getRobotAvailable() {
        return robotAvailable;
    }

    public void setRobotAvailable(int robotAvailable) {
        this.robotAvailable = robotAvailable;
    }
}
