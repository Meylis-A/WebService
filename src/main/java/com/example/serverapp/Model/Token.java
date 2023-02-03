package com.example.serverapp.Model;

import com.example.serverapp.Repository.Repo_Token;

import javax.persistence.*;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_account_id")
    User_account user_account;

    String token;

    Timestamp expiration_date;

    public Timestamp getExpiration_date() {
        return expiration_date;
    }

    public void setExpiration_date(Timestamp expiration_date) {
        this.expiration_date = expiration_date;
    }

    public User_account getUser_account() {
        return user_account;
    }

    public void setUser_account(User_account user_account) {
        this.user_account = user_account;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public  String criptage(String text) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");

        // Change this to UTF-16 if needed
        md.update(text.getBytes(StandardCharsets.UTF_8));
        byte[] digest = md.digest();

        String hex = String.format("%064x", new BigInteger(1, digest));
        return hex;
    }

    public void generateToken(User_account user) throws NoSuchAlgorithmException {
        this.token=criptage(user.getPassword().concat(user.getEmail()));
        this.user_account =user;

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        timestamp.setMinutes(timestamp.getMinutes()+120);
        this.expiration_date=timestamp;
    }

    public Token check_Expiration(String script, Repo_Token repo){
        script=script.substring(7);
        Token token =repo.findTokenByToken(script);
        return token;
    }
}
