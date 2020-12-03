package com.dispatch.service;
import com.dispatch.dao.OrderDao;
import com.dispatch.entity.Order;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dispatch.external.GoogleMapClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class OrderService {

    @Autowired
    private OrderDao orderDao;

    public ResponseEntity<String> addOrder(Order order) throws JsonProcessingException {
        Map<String, String> toReturn = new HashMap<>();
        try {
            orderDao.addOrder(order);

            toReturn.put("status", String.valueOf(200));
            toReturn.put("email", order.getUser().getEmailId());
            toReturn.put("station", String.valueOf(order.getStation()));
            toReturn.put("method", order.getDeliverType());
            toReturn.put("height", String.valueOf(order.getTotalWeight()));
            toReturn.put("pickUpLocation", String.valueOf(order.getPickUpAddress()));
            toReturn.put("putDownLocation", String.valueOf(order.getPutDownAddress()));
            toReturn.put("price", String.valueOf(order.getPrice()));
            String json = new ObjectMapper().writeValueAsString(toReturn);
            return new ResponseEntity<String>(json, HttpStatus.OK);
        } catch (Exception e) {
            toReturn.put("message", "Order failed.");
            String json = new ObjectMapper().writeValueAsString(toReturn);
            return new ResponseEntity<String>(json, HttpStatus.BAD_REQUEST);
        }
    }


}