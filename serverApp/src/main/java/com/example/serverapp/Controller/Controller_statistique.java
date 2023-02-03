package com.example.serverapp.Controller;

import com.example.serverapp.Model.Statistique;
import com.example.serverapp.Repository.Repo_Token;
import com.example.serverapp.Repository.Repo_statistique_categorie;
import com.example.serverapp.Repository.Repo_statistique_user;
import com.example.serverapp.Util.ResponseData;
import com.example.serverapp.Util.ResponseError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/statistiques")
public class Controller_statistique {

    Repo_Token repo_token;
    Repo_statistique_categorie repo_statistique_categorie;
    Repo_statistique_user repo_statistique_user;

    public Repo_Token getRepo_token() {
        return repo_token;
    }

    public void setRepo_token(Repo_Token repo_token) {
        this.repo_token = repo_token;
    }

    public Repo_statistique_categorie getRepo_statistique_categorie() {
        return repo_statistique_categorie;
    }

    public void setRepo_statistique_categorie(Repo_statistique_categorie repo_statistique_categorie) {
        this.repo_statistique_categorie = repo_statistique_categorie;
    }

    public Repo_statistique_user getRepo_statistique_user() {
        return repo_statistique_user;
    }

    public void setRepo_statistique_user(Repo_statistique_user repo_statistique_user) {
        this.repo_statistique_user = repo_statistique_user;
    }

    public Controller_statistique(Repo_Token repo_token, Repo_statistique_categorie repo_statistique_categorie, Repo_statistique_user repo_statistique_user) {

        setRepo_token(repo_token);
        setRepo_statistique_categorie(repo_statistique_categorie);
        setRepo_statistique_user(repo_statistique_user);
    }


    @GetMapping()
    public Object findAll(){
        try{

            return  new ResponseData(new Statistique(getRepo_statistique_categorie().findAll(),getRepo_statistique_user().findAll()));
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
    }
}
