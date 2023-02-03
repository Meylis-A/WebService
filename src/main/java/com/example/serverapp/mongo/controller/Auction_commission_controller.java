package com.example.serverapp.mongo.controller;


import com.example.serverapp.Util.ResponseData;
import com.example.serverapp.mongo.model.Auction_commission;
import com.example.serverapp.mongo.repo.Auction_commission_repo;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/auction_commissions")
public class Auction_commission_controller {

    Auction_commission_repo auction_commission_repo;

    public Auction_commission_controller(Auction_commission_repo auction_commission_repo) {
        this.auction_commission_repo = auction_commission_repo;
    }

    @PostMapping()
    public Object create( @RequestBody Auction_commission auction_commission){
        auction_commission.setModified_date(Date.valueOf(LocalDate.now()));
        auction_commission_repo.save(auction_commission);
        return new ResponseData("auction_commission updated sucessfully");
    }


    @GetMapping("/last")
    public Object findLast(){

        List<Auction_commission> auction_commissions=auction_commission_repo.findByOrderByModifiedDateDesc();
        if(auction_commissions.size()>0)
            return new ResponseData(auction_commissions.get(0));
        return new ResponseData(null);

    }



}
