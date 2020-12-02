package com.dispatch.dao;

import com.dispatch.entity.Box;
import com.dispatch.entity.Station;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoxDao {
    @Autowired
    private SessionFactory sessionFactory;

    public String stationsCanBeUsed(Box box){
        // return the available stations' locations
        Station station1 = null;
        Station station2 = null;
        Station station3 = null;
        try (Session session = sessionFactory.openSession()){
            station1 = session.get(Station.class, "SanFranciscoStateUniversity");
        } catch (Exception e){
            e.printStackTrace();
        }
        try (Session session = sessionFactory.openSession()){
            station2 = session.get(Station.class, "UniversityOfSanFrancisco");
        } catch (Exception e){
            e.printStackTrace();
        }
        try (Session session = sessionFactory.openSession()){
            station3 = session.get(Station.class, "BernalHeightsPark");
        } catch (Exception e){
            e.printStackTrace();
        }

        String location = String.valueOf(station1.getLatitude()) + ","
                          + String.valueOf(station1.getLongitude()) + ","
                          + String.valueOf(station2.getLatitude()) + ","
                          + String.valueOf(station2.getLongitude()) + ","
                          + String.valueOf(station3.getLatitude()) + ","
                          + String.valueOf(station3.getLongitude()) + ",";
        return location;
    }
}
