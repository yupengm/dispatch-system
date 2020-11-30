package com.dispatch.service;
import com.dispatch.external.GoogleMapClient;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import com.dispatch.dao.StationDao;
import com.dispatch.entity.Station;
import org.springframework.beans.factory.annotation.Autowired;

public class OrderOptionService {

    @Autowired
    private Station station;

    @Autowired
    private StationDao stationDao;

    //TODO:



    public JSONObject availabilityCheck(int size, double weight, String[] feature) {
        //TODO: stations = stationDao.getAllStations();
        List<Station> stations = stationDao.getAllStations();
        JSONObject response = new JSONObject();
        int count = 1;
        for (Station station : stations) {
            JSONObject stationInfo = new JSONObject();
            if (isDroneApplicable(size,weight, feature)){
                if (station.getDroneAvailable() >= 1 && station.getRobotAvailable() >= 1) {
                    int methodCode = 3; // drone and robot both available
                } else if (station.getDroneAvailable() < 1) {
                    int methodCode = 1;// only robot available
                } else if (station.getRobotAvailable() < 1) {
                    int methodCode = 2; // only drone available
                }
            } else {
                if (station.getRobotAvailable() >= 1) {
                    int methodCode = 1;// only robot available
                }
            }
            int methodCode = 0;

            stationInfo.put("stationName", station.getName());
            stationInfo.put("methodCode", methodCode);
            stationInfo.put("geoLocationX", station.getLatitude());
            stationInfo.put("geoLocationY", station.getLongitude());
            String stationKey = "Station" + count;
            response.put(stationKey,stationInfo);
            count++;
        }
        return response;
    }


    public boolean isDroneApplicable(int size, double weight, String[] feature) {
        final int MAX_SIZE = 180; // TBD
        final int MAX_WEIGHT = 5; // TBD

        if (size > MAX_SIZE || weight > MAX_WEIGHT || feature.length > 0) {
            return false;
        } else {
            return true;
        }
    }




}
