package com.skillsync.dto;

public class AuthResponse {

    private String token;

    // ✅ Default no-arg constructor (needed for deserialization)
    public AuthResponse() {
    }

    // ✅ This constructor matches your usage in AuthService
    public AuthResponse(String token) {
        this.token = token;
    }

    // ✅ Getter
    public String getToken() {
        return token;
    }

    // ✅ Setter
    public void setToken(String token) {
        this.token = token;
    }
}
