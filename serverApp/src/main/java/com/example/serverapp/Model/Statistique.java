package com.example.serverapp.Model;

import java.util.List;

public class Statistique {
    List<V_statistique_categorie> statistique_categories;
    List<V_statistique_user> statistique_users;

    public List<V_statistique_categorie> getStatistique_categories() {
        return statistique_categories;
    }

    public void setStatistique_categories(List<V_statistique_categorie> statistique_categories) {
        this.statistique_categories = statistique_categories;
    }

    public List<V_statistique_user> getStatistique_users() {
        return statistique_users;
    }

    public void setStatistique_users(List<V_statistique_user> statistique_users) {
        this.statistique_users = statistique_users;
    }

    public Statistique(List<V_statistique_categorie> statistique_categories, List<V_statistique_user> statistique_users) {
        setStatistique_categories(statistique_categories);
        setStatistique_users(statistique_users);
    }
}
