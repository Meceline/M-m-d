package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserResponse;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.service.JWTService;
import com.openclassrooms.mddapi.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;


    @GetMapping("/auth/me") //get current user
    public ResponseEntity<?> getUser() {
        try {
            UserResponse userResponse = getUserFromAuthentication();
            if (userResponse != null) {
                return ResponseEntity.ok(userResponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return handleServerError();
        }

    }

    @PostMapping("/themes/{theme_id}")
    public ResponseEntity<?> subscribeToTheme(@PathVariable("theme_id") Long themeId) {
        try {
            UserResponse userResponse = getUserFromAuthentication();
            userService.subscribeTheme(themeId, userResponse);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @DeleteMapping("/themes/{theme_id}/unsubscribe")
    public ResponseEntity<?> unsubscribeFromTheme(@PathVariable("theme_id") Long themeId) {
        try {
            UserResponse userResponse = getUserFromAuthentication();
            userService.unsubscribeTheme(themeId, userResponse);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @GetMapping("/themes/subscribed-themes")
    public ResponseEntity<?> getSubscribedThemes() {
        try {
            UserResponse userResponse = getUserFromAuthentication();
            List<Theme> subscribedThemes = userService.getSubscribedThemes(userResponse);
            return ResponseEntity.ok(subscribedThemes);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @GetMapping("/users/profil")
    public ResponseEntity<UserResponse> getUserProfile() {
        UserResponse userResponse = getUserFromAuthentication();
        UserResponse user = userService.getUserProfile(userResponse.getId());
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/profil")
    public ResponseEntity<UserResponse> updateUserProfile(@RequestBody UserResponse userResponse) {
        UserResponse user_response = getUserFromAuthentication();
        UserResponse updatedUser = userService.updateUserProfile(user_response.getId(), userResponse);
        return ResponseEntity.ok(updatedUser);
    }

    private UserResponse getUserFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt) {
            return jwtService.getUser((Jwt) authentication.getPrincipal());
        }
        return null;
    }
    private ResponseEntity<Map<String, String>> handleServerError() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", "An error occurred while processing your user request"));
    }
}
