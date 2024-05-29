package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepositoty;

    public User register(RegisterRequest registerRequest){
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getUserName());
        user.setPassword(registerRequest.getPassword());
        user.setCreated_at(new Date());
        user.setUpdated_at(new Date());

        return userRepositoty.save(user);
    }
}
