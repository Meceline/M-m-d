package com.openclassrooms.mddapi.dto;

public class LoginRequest {
    public String emailOrUserName;
    public String password;

    public String getEmailOrUserName() {
        return emailOrUserName;
    }

    public void setEmailOrUserName(String emailOrUserName) {
        this.emailOrUserName = emailOrUserName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
