package com.example.tutorial.controller;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user")
    public Map<String, Object> user(OAuth2AuthenticationToken auth) {
        return auth.getPrincipal().getAttributes();
    }
}
