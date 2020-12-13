
package com.dispatch.controller;

import com.dispatch.entity.Order;
import com.dispatch.service.OrderService;
import com.dispatch.service.TrackingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OrderSubmissionController {

    @Autowired
    OrderService orderService;

    @RequestMapping(value = "/submit_order", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> submitOrder(@RequestBody Order order,
                                              BindingResult result) throws Exception {
        if (result.hasErrors()) {
            return null;
        }
        return orderService.addOrder(order);
    }


}