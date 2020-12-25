package com.dispatch.controller;

import com.dispatch.service.AddressValidationService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
public class LocationValidationController {
    @Autowired
    AddressValidationService addressValidationService;

    @RequestMapping(value = "/addressValidation", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> addressValidation(@RequestBody HashMap<String, String> requestData, BindingResult result) throws Exception {
        if (result.hasErrors()) {
            return null;
        }
        String pickupAddress = requestData.get("pickup_address") + " " +
                requestData.get("pickup_city") + " " +
                requestData.get("pickup_zip");
        String deliverAddress = requestData.get("deliver_address") + " " +
                requestData.get("deliver_city") + " " +
                requestData.get("deliver_zip");
        return addressValidationService.addressValidation(pickupAddress, deliverAddress);
    }
}


//        PickUpAddress pickUpAddress = new PickUpAddress();
//        pickUpAddress.setAddress = requestData.get("pickup_address");
//        pickUpAddress.setCity = requestData.get("pickup_city");
//        pickUpAddress.setZipcode = requestData.get("pickup_zip");
//
//        PutDownAddress putDownAddress = new PutDownAddress();
//        putDownAddress.setAddress = requestData.get("deliver_address");
//        putDownAddress.setCity = requestData.get("deliver_city");
//        putDownAddress.setZipcode = requestData.get("deliver_zip");
//
//        JSONObject pickup = addressValidationService.addressValidation(pickUpAddress);
//        JSONObject deliver = addressValidationService.addressValidation(putDownAddress);
