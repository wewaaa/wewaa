package com.wewaa.backend.social.api;

import com.wewaa.backend.social.token.AuthToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<AuthToken> login() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/refresh")
    public ResponseEntity<AuthToken> refreshToken (HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(null);
    }
}
