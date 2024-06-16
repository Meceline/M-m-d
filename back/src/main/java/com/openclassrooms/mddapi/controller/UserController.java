package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserResponse;
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
        System.out.println(themeId);
        System.out.println(getUserFromAuthentication().getUsername());
        try {
            UserResponse userResponse = getUserFromAuthentication();
            System.out.println(userResponse.getUsername());
            userService.subscribeTheme(themeId, userResponse);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    // récupére l'utilisateur à partir de l'objet Authentication
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
