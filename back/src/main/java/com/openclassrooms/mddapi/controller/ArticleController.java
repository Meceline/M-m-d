package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.UserResponse;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/articles")
    public ResponseEntity<Iterable<Article>> getAllArticles() {
        Iterable<Article> articles = articleService.getAllArticle();
        return ResponseEntity.ok(articles);
    }

    @PostMapping("/articles/{id}")
    public ResponseEntity<?> getArticleById(@PathVariable("id") final String id_string){
        try {
            Long id = Long.parseLong(id_string);
            Optional<Article> article = articleService.getArticleById(id);
            if (article.isPresent()) {
                return ResponseEntity.ok(article.get());
            } else {
                return ResponseEntity.status(404).body("Article not found");
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid article ID format");
        } catch (Exception e) {
            return handleServerError(e);
        }
    }

@PostMapping("/articles/new")
public ResponseEntity<?> createArticle(@RequestBody ArticleDTO articleDTO) {
    try {
        articleService.addArticle(articleDTO.getThemeId(), articleDTO.getTitle(), articleDTO.getContent());
        return ResponseEntity.ok(Collections.singletonMap("message", "Article created!"));
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }  catch (Exception e) {
        return handleServerError(e);
    }
}











    private ResponseEntity<?> handleServerError(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error " + e);
    }

}
