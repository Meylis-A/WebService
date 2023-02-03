package com.example.serverapp.mongo.repo;

import com.example.serverapp.mongo.model.Auction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface Auction_repo extends MongoRepository<Auction,Integer> {

    @Query(value="{ 'user_account._id': ?0 }")
    Auction[] findBy_IdUser(int iduser);
}
