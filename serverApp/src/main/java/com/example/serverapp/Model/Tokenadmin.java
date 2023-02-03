package com.example.serverapp.Model;

import com.example.serverapp.Repository.Repo_Token;
import com.example.serverapp.Repository.Repo_Tokenadmin;

import javax.persistence.*;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;

@Entity
@Table(name = "tokenadmin")
public class Tokenadmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    Admin admin;

    String token;

    Timestamp expiration_date;

    public Timestamp getExpiration_date() {
        return expiration_date;
    }

    public void setExpiration_date(Timestamp expiration_date) {
        this.expiration_date = expiration_date;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
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

    public void generateToken(Admin admin) throws NoSuchAlgorithmException {
        this.token=criptage(admin.getPassword().concat(admin.getEmail()));
        this.admin =admin;

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        timestamp.setMinutes(timestamp.getMinutes()+120);
        this.expiration_date=timestamp;
    }

    public Tokenadmin check_Expiration(String script, Repo_Tokenadmin repo){
        script=script.substring(7);
        Tokenadmin token =repo.findTokenByToken(script);
        return token;
    }
}
