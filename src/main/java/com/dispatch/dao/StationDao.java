package com.dispatch.dao;


import com.dispatch.entity.Station;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.hibernate.Session;

@Repository
public class StationDao {  // initialize stations: add stations in the database
                           // information of stations:
                           // "SanFranciscoStateUniversity": 37.725012099170854, -122.47986516603898
                           // "UniversityOfSanFrancisco": 37.77659175985596, -122.45072433249807
                           // "BernalHeightsPark": 37.74336758244373, -122.41411171945718
    @Autowired
    private SessionFactory sessionFactory;

    private void addStation(Station station) {
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
}
