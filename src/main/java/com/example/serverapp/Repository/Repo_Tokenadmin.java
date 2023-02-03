package com.example.serverapp.Repository;

import com.example.serverapp.Model.Token;
import com.example.serverapp.Model.Tokenadmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface Repo_Tokenadmin extends JpaRepository<Tokenadmin,Integer> {
    @Query(value = "SELECT * FROM tokenadmin t where t.token= ?1 and t.expiration_date>now() order by t.expiration_date desc limit 1",nativeQuery = true)
    Tokenadmin findTokenByToken(String token);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM tokenadmin t where t.admin_id = ?1",nativeQuery = true)
    void deleteToken(int idAdmin);
}
