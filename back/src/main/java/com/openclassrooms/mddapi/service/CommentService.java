package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.dto.UserResponse;
import com.openclassrooms.mddapi.models.Article;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;
    public Iterable<Comment> save(CommentDTO commentRequest) throws Exception {

        Comment comment = new Comment();
        Optional<Article> optionalArticle = articleRepository.findById(commentRequest.getArticle_id());
        if (optionalArticle.isEmpty()) {
            throw new Exception("Article not found");
        }
        Article article = optionalArticle.get();
        comment.setArticle(article);

        comment.setContent(commentRequest.getContent());
        comment.setCreated_at(new Date());
        comment.setUpdated_at(new Date());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt) {
            UserResponse userResponse = jwtService.getUser((Jwt) authentication.getPrincipal());
            User user = userRepository.findById(userResponse.getId()).orElseThrow(() -> new Exception("User not found"));
            comment.setUser(user);
        } else {
            throw new Exception("User not authenticated");
        }

        try {
            commentRepository.save(comment);
            return commentRepository.findAllByArticleId(comment.getArticle().getId());
        } catch (Exception e) {
            throw new Exception("Error saving comment", e);
        }
    }

    public List<Comment> getCommentsByArticleId(Long article_id){
        return commentRepository.findAllByArticleId(article_id);
    }
}
