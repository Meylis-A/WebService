package com.example.serverapp.Repository;

import com.example.serverapp.Model.User_account;
import com.example.serverapp.Model.V_auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Repo_v_auction  extends JpaRepository<V_auction,Integer> {


    @Query(value = "SELECT * from v_auction a join auction au on a.auction_id=au.id where au.user_account_id= ?1",nativeQuery = true)
    List<V_auction> findByUserAccountId (int user_account_id);

    @Query(value = "SELECT * from v_auction a join auction_bid b on a.auction_id=b.auction_id where b.user_account_id= ?1",nativeQuery = true)
    List<V_auction> findByUserBidId (int user_account_id);

}
