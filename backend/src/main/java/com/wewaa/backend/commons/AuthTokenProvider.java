package com.wewaa.backend.commons;

import com.wewaa.backend.social.dto.AuthTokenDto;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class AuthTokenProvider {

    private final Key key;
    private static final String AUTHORITIES_KEY = "role";


    public AuthTokenProvider(String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public AuthTokenDto createAuthToken(String id, Date expiry) {
        return new AuthTokenDto(id, expiry, key);
    }

    public AuthTokenDto createAuthToken(String id, String role, Date expiry) {
        return new AuthTokenDto(id, role, expiry, key);
    }

}
