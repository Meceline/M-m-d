package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ThemeController {
    @Autowired
    private ThemeService themeService;

    /*
     @GetMapping("/articles")
    public ResponseEntity<Iterable<Article>> getAllArticles() {
        Iterable<Article> articles = articleService.getAllArticle();
        return ResponseEntity.ok(articles);
    }
     */

    @GetMapping("/themes")
    public ResponseEntity<Iterable<Theme>> getAllThemes(){
        Iterable<Theme> theme = themeService.getAllTheme();
        return ResponseEntity.ok(theme);
    }
}
