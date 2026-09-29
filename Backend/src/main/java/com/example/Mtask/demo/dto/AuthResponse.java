package com.example.Mtask.demo.dto;

public class AuthResponse {

    private String token;

    // ✅ MUST: default constructor
    public AuthResponse() {
    }

    // ✅ used in service
    public AuthResponse(String token) {
        this.token = token;
    }

    // ✅ MUST: getter
    public String getToken() {
        return token;
    }

    // optional setter
    public void setToken(String token) {
        this.token = token;
    }
}
