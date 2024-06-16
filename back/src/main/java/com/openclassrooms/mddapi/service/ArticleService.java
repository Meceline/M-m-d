package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.UserResponse;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Theme;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.Authentication;

import java.util.Date;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;


    @Autowired
    private JWTService jwtService;

    @Autowired
    private ThemeService themeService;


    public Iterable<Article> getAllArticle(){
        return articleRepository.findAll();
    }

    public Optional<Article> getArticleById(Long id) {
        return articleRepository.findById(id);
    }

    public void  addArticle(Long theme_id, String title, String content) throws Exception {
        Article article = new Article();
        article.setTitle(title);
        article.setContent(content);
        article.setCreated_at(new Date());
        article.setUpdated_at(new Date());

        //recup theme id
        Optional<Theme> optionalTheme = themeService.getThemeById(theme_id);
        if (optionalTheme.isPresent()) {
            article.setTheme(optionalTheme.get());
        } else {
            throw new Exception("Theme not found");
        }
        //recup user id
        User user = new User();
        user.setId(getUserFromAuthentication().getId());
        article.setUser(user);

        articleRepository.save(article);
    }

       public UserResponse getUserFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt) {
            return jwtService.getUser((Jwt) authentication.getPrincipal());
        }
        return null;
    }

}
