package com.dispatch.dao;


import com.dispatch.entity.Order;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void addOrder(Order order){
        Session session = null;
        try{
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(order);  // add Oder, Box, Route, Station, PickUpAddress, PutDownAddress, Customer in database
            session.getTransaction().commit();
        } catch (Exception e){
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null){
                session.close();
            }
        }
    }

    public Order getOrderByOrderId(int orderId){
        try (Session session = sessionFactory.openSession()){
            return session.get(Order.class, orderId);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
