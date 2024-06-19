package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.service.JWTService;
import com.openclassrooms.mddapi.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

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

    private ResponseEntity<Map<String, String>> handleServerError() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", "An error occurred while processing your user request"));
    }
}
