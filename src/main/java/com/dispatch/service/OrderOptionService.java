package com.dispatch.service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import com.dispatch.dao.StationDao;
import com.dispatch.entity.Station;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class OrderOptionService {

    @Autowired
    private StationDao stationDao;

    public ResponseEntity<ArrayList<String>> availabilityCheck(int size, double weight, String[] feature) throws JsonProcessingException {
        List<Station> stations = stationDao.getAllStations();
        ArrayList<String> jsonArray = new ArrayList<>();
        for (Station station : stations) {
            Map<String, String> toReturn = new HashMap<>();
            int methodCode = 0;
            if (isDroneApplicable(size, weight, feature)){
                if (station.getDroneAvailable() >= 1 && station.getRobotAvailable() >= 1) {
                    methodCode = 3; // drone and robot both available
                } else if (station.getDroneAvailable() < 1) {
                    methodCode = 1;// only robot available
                } else if (station.getRobotAvailable() < 1) {
                    methodCode = 2; // only drone available
                }
            } else {
                if (station.getRobotAvailable() >= 1) {
                    methodCode = 1;// only robot available
                } else {
                    methodCode = 0;
                }
            }

            toReturn.put("stationName", station.getName());
            toReturn.put("methodCode", String.valueOf(methodCode));
            toReturn.put("geoLocationX", String.valueOf(station.getLatitude()));
            toReturn.put("geoLocationY", String.valueOf(station.getLongitude()));

            final ObjectMapper mapper = new ObjectMapper();
            mapper.configure(JsonGenerator.Feature.QUOTE_FIELD_NAMES, false);
            mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, false);
            String json = mapper.writeValueAsString(toReturn);
            jsonArray.add(json);
        }
        return new ResponseEntity<ArrayList<String>>(jsonArray, HttpStatus.OK);
    }


    public boolean isDroneApplicable(int size, double weight, String[] feature) {
        final int MAX_SIZE = 180; // unit in cm^3. TBD
        final int MAX_WEIGHT = 5; // unit in kg.   TBD

        if (size > MAX_SIZE || weight > MAX_WEIGHT || feature.length > 0) {
            return false;
        } else {
            return true;
        }
    }




}
