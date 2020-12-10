
package com.dispatch.tempEntity;

public class StationAvailability {
    public StationAvailability(String stationName, int methodCode,
                               double geoLocationX, double geoLocationY)  {
        this.stationName = stationName;
        this.methodCode = methodCode;
        this.geoLocationX = geoLocationX;
        this.geoLocationY = geoLocationY;
    }

    public String stationName;
    public int methodCode;
    public double geoLocationX;
    public double geoLocationY;
}
