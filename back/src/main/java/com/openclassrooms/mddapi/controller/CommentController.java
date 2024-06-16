package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.dto.UserResponse;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.service.CommentService;
import com.openclassrooms.mddapi.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/comments/{articleId}")
    public List<Comment> getCommentsByArticleId(@PathVariable Long articleId) {
        return commentService.getCommentsByArticleId(articleId);
    }

   @PostMapping("/comments")
   public ResponseEntity<?> postComment(@RequestBody CommentDTO commentDto){
       try {
           return ResponseEntity.ok(commentService.save(commentDto));
       } catch (Exception e) {
           return handleServerError(e);
       }
   }



    private ResponseEntity<?> handleServerError(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

}
