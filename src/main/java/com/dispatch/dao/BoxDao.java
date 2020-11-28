package com.dispatch.dao;

import com.dispatch.entity.Box;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoxDao {
    @Autowired
    private SessionFactory sessionFactory;

    public String stationsCanBeUsed(Box box){
        // return the available stations' locations
        String location = "37.725012099170854, -122.47986516603898; 37.77659175985596, -122.45072433249807; 37.74336758244373, -122.41411171945718";
        return location;
    }

}
