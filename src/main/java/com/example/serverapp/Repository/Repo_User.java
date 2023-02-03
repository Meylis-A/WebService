package com.example.serverapp.Repository;

import com.example.serverapp.Model.User_account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Repo_User extends JpaRepository<User_account, Integer> {

    @Query(value = "SELECT * from user_account a where a.email= ?1 and a.password= ?2",nativeQuery = true)
    User_account userLogin (String email,String pwd);

    @Query(value = "SELECT * from user_account a where a.username=?1 and a.email= ?2 and a.password= ?3",nativeQuery = true)
    User_account checkUser (String unsername,String email,String pwd);
}
