package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserResponse;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.service.JWTService;
import com.openclassrooms.mddapi.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ThemeController {
    @Autowired
    private ThemeService themeService;

    @Autowired
    private JWTService jwtService;


    @GetMapping("/themes")
    public ResponseEntity<Iterable<Theme>> getAllThemes(){
        Iterable<Theme> theme = themeService.getAllTheme();
        return ResponseEntity.ok(theme);
    }



    private ResponseEntity<?> handleServerError(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error " + e);
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
