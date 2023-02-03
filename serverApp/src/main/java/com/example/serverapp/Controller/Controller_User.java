package com.example.serverapp.Controller;

import com.example.serverapp.Model.Token;
import com.example.serverapp.Model.User_account;
import com.example.serverapp.Repository.Repo_Recharge;
import com.example.serverapp.Repository.Repo_Token;
import com.example.serverapp.Repository.Repo_User;
import com.example.serverapp.Util.ResponseData;
import com.example.serverapp.Util.ResponseError;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class Controller_User {
    Repo_User repo_user;
    Repo_Token repo_token;
    Repo_Recharge repo_recharge;

    public Controller_User(Repo_User repo_user,Repo_Token repo_token,Repo_Recharge repo_recharge){
        this.repo_user=repo_user;
        this.repo_token=repo_token;
        this.repo_recharge=repo_recharge;
    }

    @PostMapping("/inscription")
    public Object inscription(@RequestBody User_account user){
        try{
            user.inscription(this.repo_user);
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
        return new ResponseData("Success");
    }

    @PostMapping("/login")
    public Object login (@RequestBody User_account user){
        Token token =null;
        try{
            token=user.login(this.repo_user,this.repo_token);
        }catch(Throwable e){
            return new ResponseError(e.getMessage());
        }
        return new ResponseData(token);
    }

    @PostMapping("/{iduser}/deconnexion")
    public Object deconnexion(@RequestHeader("Authorization") String token,@PathVariable int iduser){
        try{
            User_account user =new User_account();
            user.setId(iduser);
            user.deconnexion(this.repo_token,token);
        }catch(Throwable e){
            return new ResponseError("Error");
        }
        return new ResponseData("Success");
    }

}
