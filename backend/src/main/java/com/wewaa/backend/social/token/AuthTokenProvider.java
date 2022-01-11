package com.wewaa.backend.social.token;

import com.wewaa.backend.social.exception.TokenValidFailedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
public class AuthTokenProvider {

    private final Key key;
    private static final String AUTHORITIES_KEY = "role";


    public AuthTokenProvider(String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    /**
     *  create Auth Token method
     * @param id oauth token
     * @param expiry expire date
     * @return {@link AuthToken}
     */
    public AuthToken createAuthToken(String id, Date expiry) {
        return new AuthToken(id, expiry, key);
    }

    /**
     *  create Auth Token method with role
     * @param id oauth token
     * @param role role
     * @param expiry expire date
     * @return {@link AuthToken}
     */
    public AuthToken createAuthToken(String id, String role, Date expiry) {
        return new AuthToken(id, role, expiry, key);
    }


    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key);
    }

}
