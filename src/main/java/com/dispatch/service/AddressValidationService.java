package com.dispatch.service;
import org.json.JSONObject;

import com.dispatch.external.GoogleMapClient;

public class AddressValidationService {
    public JSONObject addressValidation(String pickUpLocation, String putDownLocation) {
        JSONObject response = new JSONObject();
        try {
            double[] pickUpGeoLocationXY = getGeolocationXY(pickUpLocation);
            if (isSF(pickUpGeoLocationXY[0], pickUpGeoLocationXY[1])) {
                response.put("status","200");
                response.put("pickUpGeoLocationX",pickUpGeoLocationXY[0]);
                response.put("pickUpGeoLocationY",pickUpGeoLocationXY[1]);
            } else {
                response.put("status","477");
                response.put("message","pick up location not in service area");
            }
        } catch (Exception e) {
            response.put("status","457");
            response.put("message","pick up location error");
        }

        try {
            double[] putDownGeoLocationXY = getGeolocationXY(putDownLocation);
            if (isSF(putDownGeoLocationXY[0], putDownGeoLocationXY[1])) {
                response.put("status","200");
                response.put("putDownGeoLocationX",putDownGeoLocationXY[0]);
                response.put("putDownGeoLocationY",putDownGeoLocationXY[1]);
            } else {
                response.put("status","477");
                response.put("message","put down location not in service area");
            }
        } catch (Exception e) {
            response.put("status","457");
            response.put("message","put down location error");
        }

        return response;

    }

    public static double[] getGeolocationXY(String location) throws Exception {
        GoogleMapClient mapClient = new GoogleMapClient();
        String geolocationXYString = mapClient.getLocation(location);
        if (geolocationXYString.equals("empty")) {
            throw new Exception("Address doesn't exist.");
        }
        String[] geolocationXYSplit= geolocationXYString.split(",");
        double geolocationX = Double.parseDouble(geolocationXYSplit[0]);
        double geolocationY = Double.parseDouble(geolocationXYSplit[1]);
        double[] geolocationXY = {geolocationX, geolocationY};
        return geolocationXY;
    }

    public static boolean isSF(double lat, double lng) {
        final double topLeftCornerLat = 37.812703;
        final double topLeftCornerLng = -122.541816;
        final double bottomRightCornerLat = 37.693442;
        final double bottomRightCornerLng = -122.340108;

        if (lat < topLeftCornerLat
                && lat > bottomRightCornerLat
                && lng > topLeftCornerLng
                && lng < bottomRightCornerLng) {
            return true;
        }
        return false;
    }

//    public static void main(String[] args) throws Exception {
//        ArrayList<String> option = new ArrayList<String>();
//        // option.add("fragil");
//        // option.add("battery");
//        int status = deliveryStatus(140, 2, option, 37.7,
//                -122.40, 37.7, -122.48);
//        System.out.println(status);
//
//        double[] geolocationXY = getGeolocationXY("501 Twin Peaks Blvd, San Francisco, CA 94114");
//        System.out.println(geolocationXY[0]);
//        System.out.println(geolocationXY[1]);
//    }

}
