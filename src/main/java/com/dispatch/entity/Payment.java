package com.dispatch.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

import javax.persistence.*;


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

    @OneToOne(mappedBy = "payment")
    private Order order;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHolderName() {
        return holderName;
    }

    public void setHolderName(String holderName) {
        this.holderName = holderName;
    }

    public String getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(String expireDate) {
        this.expireDate = expireDate;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
