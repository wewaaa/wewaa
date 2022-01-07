package com.wewaa.backend.social.token;

import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class AuthTokenProvider {

    private final Key key;
    private static final String AUTHORITIES_KEY = "role";


    public AuthTokenProvider(String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public AuthToken createAuthToken(String id, Date expiry) {
        return new AuthToken(id, expiry, key);
    }

    public AuthToken createAuthToken(String id, String role, Date expiry) {
        return new AuthToken(id, role, expiry, key);
    }

}
