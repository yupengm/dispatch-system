package com.dispatch.service;
import com.dispatch.dao.OrderDao;
import com.dispatch.dao.StationDao;
import com.dispatch.dao.UserDao;
import com.dispatch.entity.Order;
import com.dispatch.entity.Route;
import com.dispatch.entity.Station;
import com.dispatch.entity.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dispatch.external.GoogleMapClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private StationDao stationDao;

    @Autowired
    private PriceService priceService;

    public ResponseEntity<String> addOrder(Order order) throws Exception {
        // set User
        User user = userDao.getUserByEmailId(order.getEmailId());
        order.setUser(user);

        // set Station
        String stationName = order.getRoute().getStationName();
        Station station = stationDao.getStationByName(stationName);
        order.setStation(station);

        // set time1 and time2 for drone.
        if (order.getRoute().getDeliverType() == 2) {
            Route route = order.getRoute();
            double distance1 = priceService.distance(order.getStation().getLatitude(), order.getStation().getLongitude(),
                    route.getPickUpGeoX(), route.getPickUpGeoY());
            double distance2 = priceService.distance(route.getPickUpGeoX(),route.getPickUpGeoY(),
                    route.getPutDownGeoX(),route.getPutDownGeoY());
            int time1 = (int) priceService.timeCalculator(distance1) * 60;
            int time2 = (int) priceService.timeCalculator(distance2) * 60;
            order.setTimeFromStationToPickUpAddress(time1);
            order.setTimeFromPickUpAddressToPutDownAddress(time2);
        }

        Map<String, String> toReturn = new HashMap<>();


        try {
            order.setStartTime(LocalDateTime.now().toString());
            order.setEndTime(LocalDateTime.now().plusMinutes(order.getTimeFromPickUpAddressToPutDownAddress() +
                    order.getTimeFromStationToPickUpAddress()).toString());
            orderDao.addOrder(order);
            return getStringResponseEntity(order, toReturn);
        } catch (IllegalAccessException e) {
            toReturn.put("message", "Order failed.");
            String json = new ObjectMapper().writeValueAsString(toReturn);
            return new ResponseEntity<String>(json, HttpStatus.BAD_REQUEST);
        }
    }

    static ResponseEntity<String> getStringResponseEntity(Order order, Map<String, String> toReturn) throws JsonProcessingException {
        toReturn.put("OrderNumber",String.valueOf(order.getId()));
        toReturn.put("email", order.getUser().getEmailId());
        toReturn.put("price", String.valueOf(order.getRoute().getPrice()));
        toReturn.put("station", String.valueOf(order.getStation().getStationName()));
        toReturn.put("type", String.valueOf(order.getRoute().getDeliverType()));
        toReturn.put("weight", String.valueOf(order.getBox().getWeight()));
//        toReturn.put("PickUpAddress",String.valueOf(order.getPickUpAddress()));//TODO
//        toReturn.put("PutDownAddress",String.valueOf(order.getPutDownAddress())); //TODO
        toReturn.put("StartTime",String.valueOf(order.getStartTime()));
        toReturn.put("EndTime",String.valueOf(order.getEndTime()));
        String json = new ObjectMapper().writeValueAsString(toReturn);
        return new ResponseEntity<String>(json, HttpStatus.OK);
    }


}