package com.dispatch.controller;


import com.dispatch.dao.OrderDao;
import com.dispatch.entity.Order;
import com.dispatch.service.OrderService;
import com.dispatch.service.TrackingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@Controller
public class TrackingController {
    @Autowired
    TrackingService trackingService;

    @Autowired
    OrderDao orderDao;

    @RequestMapping(value = "/tracking", params = "id" ,method = RequestMethod.GET)
//    @RequestMapping(value = "/tracking?id={id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> trackOrder(@RequestParam("id") Integer id) throws JsonProcessingException {
        return trackingService.trackOrder(id);
    }
}