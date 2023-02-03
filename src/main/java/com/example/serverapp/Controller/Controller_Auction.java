package com.example.serverapp.Controller;

import com.example.serverapp.Model.Auction;
import com.example.serverapp.Model.Token;
import com.example.serverapp.Repository.Repo_Token;
import com.example.serverapp.Repository.Repo_auction;
import com.example.serverapp.Repository.Repo_category;
import com.example.serverapp.Repository.Repo_v_auction;
import com.example.serverapp.Util.ResponseData;
import com.example.serverapp.Util.ResponseError;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/auctions")
public class Controller_Auction {



    Repo_category repo_category;

    Repo_auction repo_auction;
    Repo_Token repo_token;

    Repo_v_auction repo_v_auction;



    public Controller_Auction(Repo_auction repo_auction,Repo_Token repo_token,Repo_v_auction repo_v_auction,Repo_category repo_category) {
        this.repo_auction=repo_auction;
       this.repo_token=repo_token;
       this.repo_v_auction=repo_v_auction;
       this.repo_category=repo_category;
    }

    @PostMapping()
    public Object create(@RequestHeader("Authorization") String token,@RequestBody Auction auction, @RequestParam int min_duration,@RequestParam int max_duration){
        try{
            Token t=new Token().check_Expiration(token,this.repo_token);
            System.out.println("atooo");
            if(t==null)
                return new ResponseError("Access denied");
            if(auction.getDuration()<min_duration || auction.getDuration()>max_duration)
                return new ResponseError("Duration should be between: "+min_duration+" and "+max_duration);

           this.repo_auction.save(auction);
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
        return new ResponseData(auction);
    }
    @GetMapping()
    public Object findAll(){
        try{

            return  new ResponseData(this.repo_v_auction.findAll());
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
    }



    @GetMapping("/fiche/{idAuction}")
    public Object getFiche(@PathVariable int idAuction) {
        try {

            Optional<Auction> auctionById = repo_auction.findById(idAuction);
            if(auctionById.isPresent())
                return new ResponseData(auctionById.get());
            return new ResponseError("id not found");
        } catch (Exception e) {
            return new ResponseError(e.toString());
        }
    }

    @GetMapping("/users/{id}")
    public Object findByUserid(@RequestHeader("Authorization") String token, @PathVariable int id){
        try{
            Token t=new Token().check_Expiration(token,this.repo_token);
            if(t==null)
                return new ResponseError("Access denied");


            return  new ResponseData(this.repo_v_auction.findByUserAccountId(id));
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
    }



}
