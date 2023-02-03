package com.example.serverapp.Repository;

import com.example.serverapp.Model.Auction_bid;
import com.example.serverapp.Model.V_amountuseraccount_available;
import com.example.serverapp.Model.V_auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repo_v_amountuseraccount_available  extends JpaRepository<V_amountuseraccount_available,Integer> {

}
