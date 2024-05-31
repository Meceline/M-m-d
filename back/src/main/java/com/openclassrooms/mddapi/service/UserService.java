package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.apache.catalina.authenticator.BasicAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User register(RegisterRequest registerRequest){
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getUserName());
        user.setPassword(registerRequest.getPassword());
        user.setCreated_at(new Date());
        user.setUpdated_at(new Date());

        return userRepository.save(user);
    }

    public User login(LoginRequest loginRequest){
        System.out.println(loginRequest.getEmailOrUserName());
        User user = new User();

        user = userRepository.findByEmailAndPassword(loginRequest.getEmailOrUserName(), loginRequest.getPassword());
        if(user == null){
            user = userRepository.findByUsernameAndPassword(loginRequest.getEmailOrUserName(), loginRequest.getPassword());
        }
        return user;


    }
}
