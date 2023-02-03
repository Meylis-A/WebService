package com.example.serverapp.Repository;

import com.example.serverapp.Model.Auction;
import com.example.serverapp.Model.Auction_bid;
import com.example.serverapp.Model.V_auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Repo_auction_bid  extends JpaRepository<Auction_bid,Integer> {

    @Query(value = "SELECT * from auction_bid where user_account_id= ?1 order by bid_date desc",nativeQuery = true)
    List<Auction_bid> findByUserid(int user_account_id);


    @Query(value = "SELECT * from auction_bid where auction_id= ?1 order by bid_date desc",nativeQuery = true)
    List<Auction_bid> findByAuctionid(int idauction);
}
