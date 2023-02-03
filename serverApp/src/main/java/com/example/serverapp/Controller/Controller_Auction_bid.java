package com.example.serverapp.Controller;

import com.example.serverapp.Model.Auction;
import com.example.serverapp.Model.Auction_bid;
import com.example.serverapp.Model.Token;
import com.example.serverapp.Repository.*;
import com.example.serverapp.Util.ResponseData;
import com.example.serverapp.Util.ResponseError;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auction_bids")
public class Controller_Auction_bid {


    Repo_v_auction_bid repo_v_auction_bid;
    Repo_auction repo_auction;

    Repo_auction_bid repo_auction_bid;

    Repo_v_auction repo_v_auction;

    Repo_v_amountuseraccount_available repo_v_amountuseraccount_available;

    Repo_Token repo_token;

    public Repo_v_auction_bid getRepo_v_auction_bid() {
        return repo_v_auction_bid;
    }

    public void setRepo_v_auction_bid(Repo_v_auction_bid repo_v_auction_bid) {
        this.repo_v_auction_bid = repo_v_auction_bid;
    }

    public Repo_auction_bid getRepo_auction_bid() {
        return repo_auction_bid;
    }

    public void setRepo_auction_bid(Repo_auction_bid repo_auction_bid) {
        this.repo_auction_bid = repo_auction_bid;
    }

    public Repo_Token getRepo_token() {
        return repo_token;
    }

    public void setRepo_token(Repo_Token repo_token) {
        this.repo_token = repo_token;
    }

    public Repo_auction getRepo_auction() {
        return repo_auction;
    }

    public void setRepo_auction(Repo_auction repo_auction) {
        this.repo_auction = repo_auction;
    }

    public Repo_v_auction getRepo_v_auction() {
        return repo_v_auction;
    }

    public void setRepo_v_auction(Repo_v_auction repo_v_auction) {
        this.repo_v_auction = repo_v_auction;
    }

    public Repo_v_amountuseraccount_available getRepo_v_amountuseraccount_available() {
        return repo_v_amountuseraccount_available;
    }

    public void setRepo_v_amountuseraccount_available(Repo_v_amountuseraccount_available repo_v_amountuseraccount_available) {
        this.repo_v_amountuseraccount_available = repo_v_amountuseraccount_available;
    }

    public Controller_Auction_bid(Repo_auction repo_auction,Repo_auction_bid repo_auction_bid, Repo_v_auction repo_v_auction, Repo_v_amountuseraccount_available repo_v_amountuseraccount_available,Repo_v_auction_bid repo_v_auction_bid,Repo_Token repo_token) {
        setRepo_auction(repo_auction);
        setRepo_auction_bid(repo_auction_bid);
        setRepo_v_auction(repo_v_auction);
        setRepo_v_amountuseraccount_available(repo_v_amountuseraccount_available);
        setRepo_token(repo_token);
        setRepo_v_auction_bid(repo_v_auction_bid);
    }


    @PostMapping()
    public Object create( @RequestBody Auction_bid auction_bid){
        try{

            auction_bid.bid(auction_bid.getAuction(),getRepo_auction_bid(),getRepo_v_auction(),getRepo_v_amountuseraccount_available());
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
        return new ResponseData("Success");
    }

    @GetMapping("/users/{id}")
    public Object findByUserBidId(@RequestHeader("Authorization") String token, @PathVariable int id){
        try{
            Token t=new Token().check_Expiration(token,getRepo_token());
            if(t==null)
                return new ResponseError("Access denied");


            return  new ResponseData(getRepo_auction_bid().findByUserid(id));
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
    }


    @GetMapping("/vusers/{id}")
    public Object findVByUserBidId(@RequestHeader("Authorization") String token, @PathVariable int id){
        try{
            Token t=new Token().check_Expiration(token,getRepo_token());
            if(t==null)
                return new ResponseError("Access denied");


            return  new ResponseData(getRepo_v_auction_bid().findByUserid(id));
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
    }


    @GetMapping("/auctions/{id}")
    public Object findByAuctionid(@RequestHeader("Authorization") String token, @PathVariable int id){
        try{
            Token t=new Token().check_Expiration(token,getRepo_token());
            if(t==null)
                return new ResponseError("Access denied");


            return  new ResponseData(getRepo_auction_bid().findByAuctionid(id));
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }

    }
}
