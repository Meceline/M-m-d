package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        System.out.println("ola");
        try {
            User user = userService.register(registerRequest);
            if (user != null) {
                /*String token = generateToken(user);*/
                return ResponseEntity.ok(Collections.singletonMap("token", "token1234"));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Collections.singletonMap("error", "Failed to register user"));
            }
        } catch (Exception e) {
            /*return handleServerError();*/
        }
        return ResponseEntity.ok(Collections.singletonMap("token", "token"));
    }
}
