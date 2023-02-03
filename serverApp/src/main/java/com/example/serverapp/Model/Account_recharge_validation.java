package com.example.serverapp.Model;

import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Date;

@DynamicInsert
@Entity
@Table(name = "account_recharge_validation")
public class Account_recharge_validation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "account_recharge_id")
    Account_recharge account_recharge;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    Admin admin;

    Integer status;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Account_recharge getAccount_recharge() {
        return account_recharge;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    public void setAccount_recharge(Account_recharge account_recharge) {
        this.account_recharge = account_recharge;
    }



    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Account_recharge_validation{" +
                "id=" + id +
                ", account_recharge=" + account_recharge +
                ", admin=" + admin +
                ", status=" + status +
                '}';
    }
}
