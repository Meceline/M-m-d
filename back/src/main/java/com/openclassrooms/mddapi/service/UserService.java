package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User register(RegisterRequest registerRequest) {
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getUserName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setCreated_at(new Date());
        user.setUpdated_at(new Date());
        try {
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Email already exists!");
        }
    }

    public User login(LoginRequest loginRequest) {

        String emailOrUsername = loginRequest.getEmailOrUserName();
        String rawPassword = loginRequest.getPassword();

        Optional<User> userOptional;

        // Try to find by email
        userOptional = userRepository.findByEmail(emailOrUsername);
        if (!userOptional.isPresent()) {
            // If not found by email, try to find by username
            userOptional = Optional.ofNullable(userRepository.findByUsername(emailOrUsername));
        }

        // If user is found, check the password
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return user;
            } else {
                throw new RuntimeException("Invalid email/username or password.");
            }
        } else {
            throw new RuntimeException("Invalid email/username or password!");
        }
    }

}
