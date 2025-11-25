package com.example.tutorial.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
public class AuthTestController {

    @GetMapping("/test/auth")
    public Map<String, Object> testAuth(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Collections.singletonMap("status", "Not authenticated");
        }
        return Collections.singletonMap("status", "Authenticated as: " + principal.getAttribute("name"));
    }

    @GetMapping("/test/public")
    public Map<String, String> publicEndpoint() {
        return Collections.singletonMap("message", "This is a public endpoint");
    }
}
