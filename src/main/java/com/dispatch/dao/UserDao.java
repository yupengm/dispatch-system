package com.dispatch.dao;

import com.dispatch.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void addUser(User user) throws IllegalAccessException{
        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(user);
            session.getTransaction().commit();

        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
            throw new IllegalAccessException("Add user failed.");
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    public User getUserByEmailId(String emailId){
        try (Session session = sessionFactory.openSession()) {
            return session.get(User.class, emailId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}