package com.example.serverapp.Model;

import com.example.serverapp.Repository.Repo_Token;
import com.example.serverapp.Repository.Repo_Tokenadmin;
import com.example.serverapp.Repository.Repo_User;
import com.example.serverapp.Repository.Repo_admin;

import javax.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue
    Integer id;

    String adminkey;

    String firstname;
    String lastname;
    String email;
    String password;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAdminkey() {
        return adminkey;
    }

    public void setAdminkey(String adminkey) {
        this.adminkey = adminkey;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Tokenadmin login(Repo_admin repo_admin, Repo_Tokenadmin repo_tokenadmin) throws Exception{
        Tokenadmin token=new Tokenadmin();
        try{
            Admin admin=repo_admin.userLogin(getEmail(),getPassword());

            System.out.println("EMAIL: "+getEmail()+" ; PASSWD: "+getPassword());
            token.generateToken(admin);
            token.setAdmin(admin);
            repo_tokenadmin.save(token);
        }catch(Exception e){
            throw e;
//            throw new Exception("Mot de passe/email incorrect");
        }
        return token;
    }

}
