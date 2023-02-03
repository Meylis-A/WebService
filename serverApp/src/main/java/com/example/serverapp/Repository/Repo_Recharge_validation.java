package com.example.serverapp.Repository;

import com.example.serverapp.Model.Account_recharge;
import com.example.serverapp.Model.Account_recharge_validation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repo_Recharge_validation extends JpaRepository<Account_recharge_validation, Integer> {

}
