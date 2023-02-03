package com.example.serverapp.Controller;

import com.example.serverapp.Model.Category;
import com.example.serverapp.Model.Token;
import com.example.serverapp.Model.Tokenadmin;
import com.example.serverapp.Repository.Repo_Token;
import com.example.serverapp.Repository.Repo_Tokenadmin;
import com.example.serverapp.Repository.Repo_category;
import com.example.serverapp.Util.ResponseData;
import com.example.serverapp.Util.ResponseError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/categories")
public class Controller_category {

    Repo_category repo_category;

    @Autowired
    Repo_Token repoToken;

    @Autowired
    Repo_Tokenadmin repo_tokenadmin;
    public Controller_category(Repo_category repo_category) {
        setRepo_category(repo_category);
    }

    public Repo_category getRepo_category() {
        return repo_category;
    }

    public void setRepo_category(Repo_category repo_category) {
        this.repo_category = repo_category;
    }

    @GetMapping()
    public Object findAll(){
        try{
            return  new ResponseData(getRepo_category().findAll());
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
    }


    @PostMapping("/insertion")
    public Object save(@RequestHeader("Authorization") String bearerToken, @RequestBody Category category) {
        Tokenadmin token = new Tokenadmin();
        token = token.check_Expiration(bearerToken, repo_tokenadmin);
        if (token == null) {
            return new ResponseError("Access denied");
        }
        try {
            System.out.println(category.toString());
            getRepo_category().save(category);
            return new ResponseData("ok");
        } catch (Throwable e) {
            e.printStackTrace();
            return new ResponseError(e.getMessage());
        }
    }
}
