package com.example.serverapp.Model;

import com.example.serverapp.Repository.Repo_User;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.sql.Date;

@DynamicInsert
@Entity
@Table(name = "account_recharge")
public class Account_recharge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_account_id")
    User_account user_account;

    double recharge_amount;

    @Column(name = "recharge_date")
    Date recharge_date;

    public User_account getUser_account() {
        return user_account;
    }

    public void setUser_account(User_account user_account) {
        this.user_account = user_account;
    }

    public double getRecharge_amount() {
        return recharge_amount;
    }

    public void setRecharge_amount(double recharge_amount) {
        this.recharge_amount = recharge_amount;
    }

    public Date getRecharge_date() {
        return recharge_date;
    }

    public void setRecharge_date(Date recharge_date) {
        this.recharge_date = recharge_date;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Account_recharge{" +
                "id=" + id +
                ", category=" + user_account +
                ", recharge_amount=" + recharge_amount +
                ", recharge_date=" + recharge_date +
                '}';
    }
}
