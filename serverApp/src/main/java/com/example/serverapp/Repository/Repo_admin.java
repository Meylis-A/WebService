package com.example.serverapp.Repository;

import com.example.serverapp.Model.Admin;
import com.example.serverapp.Model.User_account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Repo_admin extends JpaRepository<Admin,Integer> {

    @Query(value = "SELECT * from admin a where a.email= ?1 and a.password= ?2",nativeQuery = true)
    Admin userLogin (String email, String pwd);

}
