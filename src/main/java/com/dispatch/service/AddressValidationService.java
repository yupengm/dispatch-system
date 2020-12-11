package com.dispatch.service;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;

import com.dispatch.external.GoogleMapClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
public class AddressValidationService {

    public ResponseEntity<String> addressValidation(String pickUpLocation, String putDownLocation) throws Exception {
        Map<String, String> toReturn = new HashMap<>();
        GoogleMapClient mapClient = new GoogleMapClient();
        String pickUplocationXYString = mapClient.getLocation(pickUpLocation);
        String putDownlocationXYString = mapClient.getLocation(putDownLocation);
        if (pickUplocationXYString == null || putDownlocationXYString == null) {
            toReturn.put("message", "Place NOT found.");
            String json = new ObjectMapper().writeValueAsString(toReturn);
            return new ResponseEntity<String>(json, HttpStatus.BAD_REQUEST);
            // status 400
        }

        double[] pickUpGeoLocationXY = splitGeolocationXY(pickUplocationXYString);
        double[] putDownGeoLocationXY = splitGeolocationXY(putDownlocationXYString);
        if (isSF(pickUpGeoLocationXY[0], pickUpGeoLocationXY[1])
                && isSF(putDownGeoLocationXY[0], putDownGeoLocationXY[1])) {
            toReturn.put("pickUpGeoLocationX", String.valueOf(pickUpGeoLocationXY[0]));
            toReturn.put("pickUpGeoLocationY", String.valueOf(pickUpGeoLocationXY[1]));
            toReturn.put("putDownGeoLocationX", String.valueOf(putDownGeoLocationXY[0]));
            toReturn.put("putDownGeoLocationY", String.valueOf(putDownGeoLocationXY[1]));
            String json = new ObjectMapper().writeValueAsString(toReturn);
            return new ResponseEntity<String>(json, HttpStatus.OK);
        } else {
            toReturn.put("message", "Out of service area");
            String json = new ObjectMapper().writeValueAsString(toReturn);
            return new ResponseEntity<String>(json, HttpStatus.SERVICE_UNAVAILABLE);
            // status 503
        }


    }

//    public JSONObject addressValidation(String pickUpLocation, String putDownLocation) {
//        JSONObject response = new JSONObject();
//        try {
//            double[] pickUpGeoLocationXY = getGeolocationXY(pickUpLocation);
//            if (isSF(pickUpGeoLocationXY[0], pickUpGeoLocationXY[1])) {
//                response.put("status","200");
//                response.put("pickUpGeoLocationX",pickUpGeoLocationXY[0]);
//                response.put("pickUpGeoLocationY",pickUpGeoLocationXY[1]);
//            } else {
//                response.put("status","477");
//                response.put("message","pick up location not in service area");
//            }
//        } catch (Exception e) {
//            response.put("status","457");
//            response.put("message","pick up location error");
//        }
//
//        try {
//            double[] putDownGeoLocationXY = getGeolocationXY(putDownLocation);
//            if (isSF(putDownGeoLocationXY[0], putDownGeoLocationXY[1])) {
//                response.put("status","200");
//                response.put("putDownGeoLocationX",putDownGeoLocationXY[0]);
//                response.put("putDownGeoLocationY",putDownGeoLocationXY[1]);
//            } else {
//                response.put("status","477");
//                response.put("message","put down location not in service area");
//            }
//        } catch (Exception e) {
//            response.put("status","457");
//            response.put("message","put down location error");
//        }
//
//        return response;

//    }

    public static double[] splitGeolocationXY(String locationXY) {
        String[] geolocationXYSplit= locationXY.split(",");
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
