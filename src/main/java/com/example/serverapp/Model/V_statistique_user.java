package com.example.serverapp.Model;

import javax.persistence.*;

@Entity
@Table(name = "v_statistique_user")
public class V_statistique_user {

    @Id
    @Column(name = "user_account_id")
    Integer id;

    @OneToOne
    @JoinColumn(name = "user_account_id",referencedColumnName = "id")
    User_account user_account;

    double bid_amount;

    public User_account getUser_account() {
        return user_account;
    }

    public void setUser_account(User_account user_account) {
        this.user_account = user_account;
    }

    public double getBid_amount() {
        return bid_amount;
    }

    public void setBid_amount(double bid_amount) {
        this.bid_amount = bid_amount;
    }
}
