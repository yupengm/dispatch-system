package com.dispatch.service;
import com.dispatch.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.json.JSONObject;

import com.dispatch.entity.User;


public class UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private User user;

    public JSONObject loginUser(String emailId, String password){
        JSONObject loginResponse = new JSONObject();
        try {
            User user = userDao.getUserByEmailId(emailId);// Here I think should return a user not customer.
            String truePassword = user.getPassword();
            if (truePassword.equals(password)) {
                loginResponse.put("status",200);
                return loginResponse;
            } else {
                System.out.println("Wrong password.");
                loginResponse.put("status",403);
                return loginResponse;
            }
        } catch (Exception e) {
            System.out.println("UserID doesn't exist.");
            loginResponse.put("status",403);
            return loginResponse;
        }
    }

    public JSONObject addUser(User user){
        JSONObject addUserResponse = new JSONObject();
        try {
            userDao.addUser(user);
            addUserResponse.put("status",200);
            return addUserResponse;
        } catch (Exception e) {
            System.out.println("Add customer failed.");
            addUserResponse.put("status",403);
            return addUserResponse;
        }
    }


}
