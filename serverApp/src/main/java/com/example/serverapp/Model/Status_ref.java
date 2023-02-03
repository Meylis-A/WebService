package com.example.serverapp.Model;

import javax.persistence.*;

@Entity
@Table(name = "status_ref")
public class Status_ref {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    String status_name;

    int status_value;

    public String getStatus_name() {
        return status_name;
    }

    public void setStatus_name(String status_name) {
        this.status_name = status_name;
    }

    public int getStatus_value() {
        return status_value;
    }

    public void setStatus_value(int status_value) {
        this.status_value = status_value;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
