package com.example.serverapp.Model;

import com.example.serverapp.Repository.Repo_Token;
import com.example.serverapp.Repository.Repo_User;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;

@DynamicInsert
@Entity
@Table(name = "user_account")
public class User_account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    String userkey;

    String username;

    String email;

    String password;

    public String getUserkey() {
        return userkey;
    }

    public void setUserkey(String userkey) {
        this.userkey = userkey;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    @Override
    public String toString() {
        return "User_account{" +
                "id=" + id +
                ", userkey='" + userkey + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public void inscription(Repo_User repo_user)throws Exception{
        try {
            User_account otherUser=repo_user.checkUser(this.username,this.email,this.password);
            if(otherUser!=null)
                throw new Exception("Erreur lors de l'inscription");
            repo_user.save(this);
        }catch(Throwable e){
            throw new Exception("Erreur lors de l'inscription");
        }
    }

    public Token login(Repo_User repo_user, Repo_Token repo_token) throws Exception{
        Token token=new Token();
        try{
            User_account user=repo_user.userLogin(this.email,this.password);
            token.generateToken(user);
            token.setUser_account(user);
            repo_token.save(token);
        }catch(Exception e){
            throw new Exception("Mot de passe/email incorrect");
        }
        return token;
    }

    public void deconnexion(Repo_Token repo_token,String token)throws Exception{
        try{
            Token token_user=new Token();
            token_user=token_user.check_Expiration(token,repo_token);
            if(token_user==null)
                throw new Exception("Error");


            repo_token.deleteToken(this.id);
        }catch(Throwable e){
            throw new Exception("Error");
        }
    }
}
