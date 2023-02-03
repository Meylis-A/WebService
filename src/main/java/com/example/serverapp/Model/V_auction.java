package com.example.serverapp.Model;

import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "v_auction")
public class V_auction {

    @Id
    @Column(name = "auction_id")
    private Integer id;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }


    @OneToOne
    @JoinColumn(name = "auction_id",referencedColumnName = "id")
    Auction auction;

    @OneToOne
    @JoinColumn(name = "auction_bid_id",referencedColumnName = "id")
    Auction_bid auction_bid;

    Timestamp final_date;

    String status;

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public Auction_bid getAuction_bid() {
        return auction_bid;
    }

    public void setAuction_bid(Auction_bid auction_bid) {
        this.auction_bid = auction_bid;
    }

    public Timestamp getFinal_date() {
        return final_date;
    }

    public void setFinal_date(Timestamp final_date) {
        this.final_date = final_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
