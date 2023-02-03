package com.example.serverapp.Repository;

import com.example.serverapp.Model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repo_auction extends JpaRepository<Auction,Integer> {
}
