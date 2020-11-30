package com.dispatch.service;
import com.dispatch.entity.Order;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dispatch.external.GoogleMapClient;

import java.util.ArrayList;


public class OrderService {
    @Autowired
    private Order order;

    public JSONObject addOrder(Order order) {
        JSONObject response = new JSONObject();
        try {
            //OrderDao.addOrder()
            response.put("status", 200);
            response.put("email", order.getUser().getEmailId());
            response.put("station", order.getStation());
            response.put("method", order.getDeliverType());
            response.put("height", order.getTotalWeight());
            response.put("pickUpLocation", order.getPickUpAddress());
            response.put("putDownLocation", order.getPutDownAddress());
            response.put("price", order.getPrice());
            return response;
        } catch (Exception e) {
            response.put("status", 403);
            response.put("message", "Order failed.");
            return response;
        }
    }


}