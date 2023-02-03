package com.example.serverapp.Controller;

import com.example.serverapp.Model.Account_recharge;
import com.example.serverapp.Model.Account_recharge_validation;
import com.example.serverapp.Model.Token;
import com.example.serverapp.Model.Tokenadmin;
import com.example.serverapp.Repository.Repo_Recharge;
import com.example.serverapp.Repository.Repo_Recharge_validation;
import com.example.serverapp.Repository.Repo_Token;
import com.example.serverapp.Repository.Repo_Tokenadmin;
import com.example.serverapp.Util.ResponseData;
import com.example.serverapp.Util.ResponseError;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/account_recharges")
public class Controller_account_recharge {

    Repo_Recharge repo_recharge;

    Repo_Token repo_token;

    Repo_Recharge_validation repo_recharge_validation;

    Repo_Tokenadmin repo_tokenadmin;

    public Repo_Recharge_validation getRepo_recharge_validation() {
        return repo_recharge_validation;
    }

    public Repo_Tokenadmin getRepo_tokenadmin() {
        return repo_tokenadmin;
    }

    public void setRepo_tokenadmin(Repo_Tokenadmin repo_tokenadmin) {
        this.repo_tokenadmin = repo_tokenadmin;
    }

    public void setRepo_recharge_validation(Repo_Recharge_validation repo_recharge_validation) {
        this.repo_recharge_validation = repo_recharge_validation;
    }

    public Repo_Recharge getRepo_recharge() {
        return repo_recharge;
    }

    public void setRepo_recharge(Repo_Recharge repo_recharge) {
        setRepo_recharge(repo_recharge);
    }

    public Repo_Token getRepo_token() {
        return repo_token;
    }

    public void setRepo_token(Repo_Token repo_token) {
        this.repo_token = repo_token;
    }

    public Controller_account_recharge(Repo_Token repo_token, Repo_Recharge repo_recharge, Repo_Recharge_validation repo_recharge_validation,Repo_Tokenadmin repo_tokenadmin) {
        this.repo_recharge = repo_recharge;
        this.repo_token=repo_token;
        this.repo_recharge_validation = repo_recharge_validation;
        this.repo_tokenadmin=repo_tokenadmin;
    }

    @PostMapping()
    public Object create( @RequestHeader("Authorization") String token,@RequestBody Account_recharge account_recharge){
        try{
            Token t=new Token().check_Expiration(token,getRepo_token());
            if(t==null)
                return new ResponseError("Access denied");

            getRepo_recharge().save(account_recharge);
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
        return new ResponseData("Success");
    }

    @PostMapping("{recharge_id}/valid")
    public Object validate( @PathVariable int recharge_id,@RequestBody Account_recharge_validation account_recharge_validation){
        try{
//            Tokenadmin t=new Tokenadmin().check_Expiration(token,getRepo_tokenadmin());
//            if(t==null)
//                return new ResponseError("Access denied");

            Account_recharge r=new Account_recharge();
            r.setId(recharge_id);
            account_recharge_validation.setAccount_recharge(r);

            getRepo_recharge_validation().save(account_recharge_validation);
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
        return new ResponseData("Success");
    }

    @GetMapping()
    public Object getToValid( @RequestHeader("Authorization") String token){
        try{
            Tokenadmin t=new Tokenadmin().check_Expiration(token,getRepo_tokenadmin());
            if(t==null)
                return new ResponseError("Access denied");

            return  new ResponseData(getRepo_recharge().getToValid());
        }catch (Throwable e){
            return new ResponseError(e.getMessage());
        }
    }
}
