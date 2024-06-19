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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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

        Optional<User> userOptional = userRepository.findByEmail(emailOrUsername);
        if (!userOptional.isPresent()) {
            userOptional = userRepository.findByUsername(emailOrUsername);
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

    //S'abonner à un thème
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


    // Se désabonner d'un thème
    public void unsubscribeTheme(Long themeId, UserResponse userResponse) {
        User user = userRepository.findById(userResponse.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new EntityNotFoundException("Theme not found"));

        user.getThemes().remove(theme);
        userRepository.save(user);
    }

    // Obtenir les thèmes auxquels un utilisateur est abonné
    public List<Theme> getSubscribedThemes(UserResponse userResponse) {
        User user = userRepository.findById(userResponse.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return new ArrayList<>(user.getThemes());
    }


    public UserResponse getUserProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setUsername(user.getUsername());
        userResponse.setCreated_at(user.getCreated_at());
        userResponse.setUpdated_at(user.getUpdated_at());
        return userResponse;
    }
    // Met à jour l'utilisateur et récupère l'utilisateur mis à jour
    public UserResponse updateUserProfile(Long id, UserResponse userResponseSend) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setUsername(userResponseSend.getUsername());
        user.setEmail(userResponseSend.getEmail());
        user.setUpdated_at(new Date());
        User updatedUser = userRepository.save(user);

        UserResponse userResponse = new UserResponse();
        userResponse.setEmail(updatedUser.getEmail());
        userResponse.setUsername(updatedUser.getUsername());
        return userResponse;
    }

    public User getUserById(Long id){
        return userRepository.findById(id).get();
    }

}
