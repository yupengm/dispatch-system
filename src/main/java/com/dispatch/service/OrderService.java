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

import java.time.LocalDateTime;
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
            order.setStartTime(LocalDateTime.now().toString());
//            order.setEndTime(LocalDateTime.now().toString() + order.); //TODO:delivery duration needed.
            orderDao.addOrder(order);

            //TODO: orderDao.generate orderId
            toReturn.put("email", order.getUser().getEmailId());
            toReturn.put("price", String.valueOf(order.getPrice()));
            toReturn.put("station", String.valueOf(order.getStation()));
            toReturn.put("type", order.getDeliverType());
            toReturn.put("size", String.valueOf(order.getBox())); //TODO: maybe abandon the box
            toReturn.put("weight", String.valueOf(order.getTotalWeight()));
            toReturn.put("PickUpAddress",String.valueOf(order.getPickUpAddress()));
            toReturn.put("PutDownAddress",String.valueOf(order.getPutDownAddress()));
            String json = new ObjectMapper().writeValueAsString(toReturn);
            return new ResponseEntity<String>(json, HttpStatus.OK);
        } catch (Exception e) {
            toReturn.put("message", "Order failed.");
            String json = new ObjectMapper().writeValueAsString(toReturn);
            return new ResponseEntity<String>(json, HttpStatus.BAD_REQUEST);
        }
    }


}