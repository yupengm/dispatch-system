package com.dispatch.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "payment")
public class Payment implements Serializable {
    private static final long serialVersionUID = 2455760938054036364L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @JsonProperty("name_on_card")
    private String holderName;

    @JsonProperty("expire_date")
    private String expireDate;

    @JsonProperty("card_number")
    private String number;

    @JsonProperty("CVV")
    private String cvv;


    @ManyToOne
    private User user;


}
