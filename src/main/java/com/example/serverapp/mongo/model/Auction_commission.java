package com.example.serverapp.mongo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("auction_commission")
public class Auction_commission {
    Integer commission_rate;

    @JsonFormat(pattern="yyyy-MM-dd")
    Date modified_date;

    public Integer getCommission_rate() {
        return commission_rate;
    }

    public void setCommission_rate(Integer commission_rate) {
        this.commission_rate = commission_rate;
    }

    public Date getModified_date() {
        return modified_date;
    }

    public void setModified_date(Date modified_date) {
        this.modified_date = modified_date;
    }
}
