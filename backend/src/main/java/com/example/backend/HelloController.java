package com.example.backend;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public Map<String, Object> hello(@AuthenticationPrincipal Jwt jwt) {
        return Map.of(
            "message", "Hello from Spring Boot!",
            "user", jwt.getClaimAsString("preferred_username"),
            "email", jwt.getClaimAsString("email"),
            "sub", jwt.getSubject()
        );
    }
}
