package com.example.serverapp.mongo.model;

public class Image {
        String image_url;

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public Image(String image_url) {
        setImage_url(image_url);
    }
}
