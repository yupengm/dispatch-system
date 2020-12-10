package com.dispatch.dao;


import com.dispatch.entity.Station;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

@Repository
public class StationDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void addStation(Station station) {
        Session session = null;
        try{
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(station);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    public List<Station> getAllStations(){
        List<Station> stations = new ArrayList<>();
        try (Session session = sessionFactory.openSession()){
            stations = session.createCriteria(Station.class).list();
        } catch (Exception e){
            e.printStackTrace();
        }
        return stations;
    }

    public Station getStationByName(String stationName){
        try (Session session = sessionFactory.openSession()) {
            return session.get(Station.class, stationName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
