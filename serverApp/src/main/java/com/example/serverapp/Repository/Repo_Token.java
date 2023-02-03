package com.example.serverapp.Repository;

import com.example.serverapp.Model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface Repo_Token extends JpaRepository<Token,Integer> {
    @Query(value = "SELECT * FROM token t where t.token= ?1 and t.expiration_date>now()",nativeQuery = true)
    Token findTokenByToken(String token);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM token t where t.user_account_id = ?1",nativeQuery = true)
    void deleteToken(int idAdmin);
}
