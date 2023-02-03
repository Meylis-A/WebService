package com.example.serverapp.mongo.controller;


import com.example.serverapp.Util.ResponseData;
import com.example.serverapp.Util.ResponseError;
import com.example.serverapp.mongo.model.Auction;
import com.example.serverapp.mongo.model.Auction_commission;
import com.example.serverapp.mongo.repo.Auction_commission_repo;
import com.example.serverapp.mongo.repo.Auction_repo;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/mongoauctions")
public class Auction_controller {

    Auction_repo auction_repo;

    public Auction_controller(Auction_repo auction_repo) {
        this.auction_repo = auction_repo;
    }

    @PostMapping()
    public Object create( @RequestBody Auction auction){
        auction_repo.save(auction);
        return new ResponseData("auction inserted sucessfully");
    }

    @GetMapping("/{idauction}")
    public Object findById(@PathVariable int idauction){
        try{
            Optional<Auction> optional=this.auction_repo.findById(idauction);

            if(optional.isPresent())
                return new ResponseData(optional.get());
        }catch (Throwable e){
            e.printStackTrace();
            return new Error(e.getMessage());
        }
        return new ResponseError("Error");
    }
    @GetMapping("/user/{iduser}")
    public Object findByUser_Id(@PathVariable int iduser){
        try{
            Auction[] auctions=this.auction_repo.findBy_IdUser(iduser);
            return  new ResponseData(auctions);
        }catch (Throwable e){
            e.printStackTrace();
        }
        return new Error("Error");
    }


    @GetMapping()
    public Object findAll(){

        return new ResponseData(auction_repo.findAll());
    }

    @PostMapping("/{id}/addimage")
    public Object addImage(@PathVariable Integer id,@RequestParam String url){
        Optional<Auction> auction = auction_repo.findById(id);
        if(auction.isPresent()){
           // auction.get().getImages().add(url);
            auction_repo.save(auction.get());
            return new ResponseData("image added successfully");
        }

        return new ResponseError("failed updated image");
    }
}
