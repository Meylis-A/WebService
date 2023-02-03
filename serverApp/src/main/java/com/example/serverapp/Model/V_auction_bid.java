package com.example.serverapp.Model;

import javax.persistence.*;

@Entity
@Table(name = "v_auction_bid")
public class V_auction_bid {

    @Id
    @Column(name = "auction_bid_id")
    private Integer auction_bid_id;


    @OneToOne
    @JoinColumn(name = "auction_bid_id",referencedColumnName = "id")
    Auction_bid auction_bid;

    @ManyToOne
    @JoinColumn(name = "user_account_id")
    User_account user_account;

    String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public V_auction_bid() {
    }

    public Integer getAuction_bid_id() {
        return auction_bid_id;
    }

    public void setAuction_bid_id(Integer auction_bid_id) {
        this.auction_bid_id = auction_bid_id;
    }

    public Auction_bid getAuction_bid() {
        return auction_bid;
    }

    public void setAuction_bid(Auction_bid auction_bid) {
        this.auction_bid = auction_bid;
    }

    public User_account getUser_account() {
        return user_account;
    }

    public void setUser_account(User_account user_account) {
        this.user_account = user_account;
    }
}
