package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.dto.UserResponse;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
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

    @Autowired
    private ThemeRepository themeRepository;


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

        userOptional = userRepository.findByEmail(emailOrUsername);
        if (!userOptional.isPresent()) {
            userOptional = Optional.ofNullable(userRepository.findByUsername(emailOrUsername));
        }

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

    public UserResponse subscribeTheme(Long themeId, UserResponse userResponse) {
        User user = userRepository.findById(userResponse.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new EntityNotFoundException("Theme not found"));

        user.getThemes().add(theme);
        userRepository.save(user);

        userResponse.setId(user.getId());
        return userResponse;
    }


    public User getUserById(Long id){
        return userRepository.findById(id).get();
    }

}
