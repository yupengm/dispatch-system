package com.dispatch;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Application {
    public static void main(String[] args){
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(ApplicationConfig.class);

    }
}
