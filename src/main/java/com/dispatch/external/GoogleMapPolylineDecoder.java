package com.dispatch.external;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GoogleMapPolylineDecoder {
    public List<List<Double>> decodePolyline(String polylineUrl){
        int index = 0;
        int lat = 0;
        int lng = 0;
        List<List<Double>> toReturn = new ArrayList<>();
        List<Coordinate> coordinates = new ArrayList<>();
        String[] array = {"latitude", "longitude"};
        Map<String, Integer> changes = new HashMap<>();
        changes.put("latitude", 0);
        changes.put("longitude", 0);

        while (index < polylineUrl.length()){
            for (String unit: array){
                int shift = 0;
                int result = 0;
                while (true){
                    int byteCurrent = (int)(polylineUrl.charAt(index)) - 63;
                    index += 1;
                    result |= (byteCurrent & 0x1f) << shift;
                    shift += 5;
                    if (byteCurrent < 0x20){
                        break;
                    }
                }
                if ((result & 1) != 0){
                    changes.put(unit, ~(result >> 1));
                } else {
                    changes.put(unit, result >> 1);
                }
            }
            lat += changes.get("latitude");
            lng += changes.get("longitude");
            coordinates.add(new Coordinate(lat / 100000.0, lng / 100000.0));
        }
        for (Coordinate coordinate: coordinates){
            List<Double> point = new ArrayList<>();
            point.add(coordinate.latitude);
            point.add(coordinate.longitude);
            toReturn.add(point);
        }
        return toReturn;
    }

    static class Coordinate{
        double latitude;
        double longitude;

        Coordinate(double latitude, double longitude){
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    public static void main (String[] args){
//        String url = "azljFjss{S?oA?kB";
//        GoogleMapPolylineDecoder g = new GoogleMapPolylineDecoder();
//        System.out.println(g.decodePolyline(url));
    }


}

