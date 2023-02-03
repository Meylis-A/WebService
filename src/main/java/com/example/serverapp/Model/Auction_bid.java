package com.example.serverapp.Model;

import com.example.serverapp.Repository.Repo_auction_bid;
import com.example.serverapp.Repository.Repo_v_amountuseraccount_available;
import com.example.serverapp.Repository.Repo_v_auction;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Date;
import java.util.Optional;

@Entity
@Table(name = "auction_bid")
@DynamicInsert
public class Auction_bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_account_id")
    User_account user_account;

    @OneToOne
    @JoinColumn(name = "auction_id",referencedColumnName = "id")
    Auction auction;

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public User_account getUser_account() {
        return user_account;
    }

    public void setUser_account(User_account user_account) {
        this.user_account = user_account;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    double bid_amount;

    Date bid_date;

    public double getBid_amount() {
        return bid_amount;
    }

    public void setBid_amount(double bid_amount) {
        this.bid_amount = bid_amount;
    }

    public Date getBid_date() {
        return bid_date;
    }

    public void setBid_date(Date bid_date) {
        this.bid_date = bid_date;
    }

    public boolean checkBid_amount(V_auction auction){
        if(auction.getAuction_bid()==null){

            if(auction.getAuction().getMin_price()<getBid_amount())
                return true;
        }
        else if(getBid_amount()>auction.getAuction_bid().getBid_amount())
            return true;
        return false;
    }

    public boolean checkAuction(Auction auction, Repo_v_auction repo_v_auction, Repo_v_amountuseraccount_available repo_v_amountuseraccount_available){
        Optional<V_auction> v_auction = repo_v_auction.findById(Math.toIntExact(auction.getId()));
        if(v_auction.isPresent()){
            V_auction v = v_auction.get();

            if(v.getId().equals(getUser_account().getId()))
                return false;

            if(v.getAuction_bid()!=null){
                if(v.getAuction_bid().getUser_account().getId().equals(getUser_account().getId()))
                    return false;
            }

            if(v.getStatus().equals("in progress")){

                if(checkBid_amount(v)){
                    Optional<V_amountuseraccount_available> v_amountuseraccount_available=repo_v_amountuseraccount_available.findById(getUser_account().getId());

                    if(v_amountuseraccount_available.isPresent()){
                        V_amountuseraccount_available va=v_amountuseraccount_available.get();
                        if(va.getAmount_available()>=getBid_amount())
                            return true;
                    }
//                    else{
//                        return true;
//                    }
                }
            }
        }else{
            return false;
        }
        return false;
    }

    public void bid(Auction auction, Repo_auction_bid repo_auction_bid, Repo_v_auction repo_v_auction, Repo_v_amountuseraccount_available repo_v_amountuseraccount_available) throws Exception {

        if(checkAuction(auction,repo_v_auction,repo_v_amountuseraccount_available)){
            repo_auction_bid.save(this);
        }else{
            throw new Exception("Mise en enchère invalide");
        }
    }
}
