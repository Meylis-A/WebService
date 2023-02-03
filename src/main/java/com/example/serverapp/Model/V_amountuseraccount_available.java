package com.example.serverapp.Model;

import javax.persistence.*;

@Entity
@Table(name = "v_amountuseraccount_available")
public class V_amountuseraccount_available {

    @Id
    @Column(name = "user_account_id")
    private Integer user_account_id;


    @OneToOne
    @JoinColumn(name = "user_account_id",referencedColumnName = "id")
    User_account user_account;

    public User_account getUser_account() {
        return user_account;
    }

    public void setUser_account(User_account user_account) {
        this.user_account = user_account;
    }

    double amount;

    double amount_available;

    public Integer getUser_account_id() {
        return user_account_id;
    }

    public void setUser_account_id(Integer user_account_id) {
        this.user_account_id = user_account_id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getAmount_available() {
        return amount_available;
    }

    public void setAmount_available(double amount_available) {
        this.amount_available = amount_available;
    }
}
