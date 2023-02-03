package com.example.serverapp.Model;

import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.sql.Timestamp;

@DynamicInsert
@Entity
@Table(name = "auction")
public class Auction {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY )
    private Integer id;

    String title;

    String description;

    double min_price;

    Timestamp start_date;

    double duration;

    @OneToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    Category category;

    @ManyToOne
    @JoinColumn(name = "user_account_id")
    User_account user_account;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getMin_price() {
        return min_price;
    }

    public void setMin_price(double min_price) {
        this.min_price = min_price;
    }

    public Timestamp getStart_date() {
        return start_date;
    }

    public void setStart_date(Timestamp start_date) {
        this.start_date = start_date;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User_account getUser_account() {
        return user_account;
    }

    public void setUser_account(User_account user_account) {
        this.user_account = user_account;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
