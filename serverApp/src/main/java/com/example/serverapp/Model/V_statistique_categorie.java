package com.example.serverapp.Model;

import javax.persistence.*;

@Entity
@Table(name = "v_statistique_categorie")
public class V_statistique_categorie {

    @Id
    @Column(name="category_id")
    Integer id;

    @OneToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    Category category;

    double bid_amount;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public double getBid_amount() {
        return bid_amount;
    }

    public void setBid_amount(double bid_amount) {
        this.bid_amount = bid_amount;
    }
}
