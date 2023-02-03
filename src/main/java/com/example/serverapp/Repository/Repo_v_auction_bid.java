package com.example.serverapp.Repository;

import com.example.serverapp.Model.Auction_bid;
import com.example.serverapp.Model.V_auction_bid;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface Repo_v_auction_bid extends Repository<V_auction_bid,Integer> {

    @Query(value = "SELECT * from v_auction_bid where user_account_id= ?1 ",nativeQuery = true)
    List<V_auction_bid> findByUserid(int user_account_id);

}
