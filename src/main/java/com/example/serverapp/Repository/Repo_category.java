package com.example.serverapp.Repository;

import com.example.serverapp.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repo_category extends JpaRepository<Category,Integer> {
}
