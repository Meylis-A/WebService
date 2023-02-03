package com.example.serverapp.Util;

public class ResponseError {
    Object error;

    public ResponseError(Object error) {
        this.error = error;
    }

    public Object getError() {
        return error;
    }

    public void setError(Object error) {
        this.error = error;
    }
}
