package com.wewaa.backend.social.api;

import com.wewaa.backend.commons.config.properties.AppProperties;
import com.wewaa.backend.social.dto.AuthReqDto;
import com.wewaa.backend.social.service.UserPrincipal;
import com.wewaa.backend.social.token.AuthToken;
import com.wewaa.backend.social.token.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<AuthToken> login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody AuthReqDto authReqDto
            // todo 이걸 통해서도 user 정보를 빼올 수 있음 나중에 찾아 볼 것
            // @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        // AuthenticationManager 에 token 을 넘기면 UserDetailsService 가 받아 처리하도록 한다.
        Authentication authentication = authenticationManager.authenticate(

                // 아이디와 패스워드로, Security 가 알아 볼 수 있는 token 객체로 변경한다.
                new UsernamePasswordAuthenticationToken(
                        authReqDto.getId(),
                        authReqDto.getPassword()
                )
        );

        String userId = authReqDto.getId();

        // 실제 SecurityContext 에 authentication 정보를 등록한다.
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Date now = new Date();

        // auth token을 publish 한다.
        AuthToken accessToken = tokenProvider.createAuthToken(
                userId,
                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        // 토큰의 만료 시간을 yaml 에서 불러 온다.
        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        // token의 만료 시간을 계산해서 refresh token을 발행 한다.
        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );
        return ResponseEntity.ok(accessToken);

    }

    @GetMapping("/refresh")
    public ResponseEntity<AuthToken> refreshToken (HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(null);
    }
}
