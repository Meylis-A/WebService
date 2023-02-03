package com.example.serverapp.Controller;

import com.example.serverapp.Model.Admin;
import com.example.serverapp.Model.Token;
import com.example.serverapp.Model.Tokenadmin;
import com.example.serverapp.Model.User_account;
import com.example.serverapp.Repository.Repo_Tokenadmin;
import com.example.serverapp.Repository.Repo_admin;
import com.example.serverapp.Util.ResponseData;
import com.example.serverapp.Util.ResponseError;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class Controller_admin {

    Repo_Tokenadmin repo_tokenadmin;
    Repo_admin repo_admin;

    public Controller_admin(Repo_Tokenadmin repo_tokenadmin, Repo_admin repo_admin) {
        setRepo_tokenadmin(repo_tokenadmin);
        setRepo_admin(repo_admin);
    }

    public Repo_Tokenadmin getRepo_tokenadmin() {
        return repo_tokenadmin;
    }

    public void setRepo_tokenadmin(Repo_Tokenadmin repo_tokenadmin) {
        this.repo_tokenadmin = repo_tokenadmin;
    }

    public Repo_admin getRepo_admin() {
        return repo_admin;
    }

    public void setRepo_admin(Repo_admin repo_admin) {
        this.repo_admin = repo_admin;
    }

    @PostMapping("/login")
    public Object login (@RequestBody Admin admin){
        Tokenadmin tokenadmin =null;
        try{
            tokenadmin=admin.login(getRepo_admin(),getRepo_tokenadmin());
        }catch(Throwable e){
            return new ResponseError(e.getMessage());
        }
        return new ResponseData(tokenadmin);
    }

}
