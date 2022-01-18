//package com.wewaa.backend.social.api;
//
//import com.wewaa.backend.commons.config.properties.AppProperties;
//import com.wewaa.backend.commons.utils.ApiResponseUtill;
//import com.wewaa.backend.commons.utils.CookieUtil;
//import com.wewaa.backend.commons.utils.HeaderUtil;
//import com.wewaa.backend.social.dto.AuthReqDto;
//import com.wewaa.backend.social.model.entity.UserRefreshToken;
//import com.wewaa.backend.social.model.repository.UserRefreshTokenRepository;
//import com.wewaa.backend.social.model.type.RoleType;
//import com.wewaa.backend.social.service.UserPrincipal;
//import com.wewaa.backend.social.token.AuthToken;
//import com.wewaa.backend.social.token.AuthTokenProvider;
//import io.jsonwebtoken.Claims;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.util.Date;
//
//@RestController
//@RequestMapping("/api/v1/auth")
//@RequiredArgsConstructor
//public class AuthController {
//
//    private final AppProperties appProperties;
//    private final AuthTokenProvider tokenProvider;
//    private final AuthenticationManager authenticationManager;
//    private final UserRefreshTokenRepository userRefreshTokenRepository;
//
//    private final static long THREE_DAYS_MSEC = 259200000;
//    private final static String REFRESH_TOKEN = "refresh_token";
//
//    @PostMapping("/login")
//    public ApiResponseUtill login(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            @RequestBody AuthReqDto authReqDto
//            // todo 이걸 통해서도 user 정보를 빼올 수 있음 나중에 찾아 볼 것
//            // @AuthenticationPrincipal UserPrincipal userPrincipal
//    ) {
//        // AuthenticationManager 에 token 을 넘기면 UserDetailsService 가 받아 처리하도록 한다.
//        Authentication authentication = authenticationManager.authenticate(
//
//                // 아이디와 패스워드로, Security 가 알아 볼 수 있는 token 객체로 변경한다.
//                new UsernamePasswordAuthenticationToken(
//                        authReqDto.getId(),
//                        authReqDto.getPassword()
//                )
//        );
//
//        String userId = authReqDto.getId();
//
//        // 실제 SecurityContext 에 authentication 정보를 등록한다.
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        Date now = new Date();
//
//        // auth token을 publish 한다.
//        AuthToken accessToken = tokenProvider.createAuthToken(
//                userId,
//                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
//                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
//        );
//
//        // 토큰의 만료 시간을 yaml 에서 불러 온다.
//        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
//
//        // token의 만료 시간을 계산해서 refresh token을 발행 한다.
//        AuthToken refreshToken = tokenProvider.createAuthToken(
//                appProperties.getAuth().getTokenSecret(),
//                new Date(now.getTime() + refreshTokenExpiry)
//        );
//        // userId refresh token 으로 DB 확인
//        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userId);
//        if (userRefreshToken == null) {
//            // 없는 경우 새로 등록
//            userRefreshToken = new UserRefreshToken(userId, refreshToken.getToken());
//            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
//        } else {
//            // DB에 refresh 토큰 업데이트
//            userRefreshToken.setRefreshToken(refreshToken.getToken());
//        }
//
//        int cookieMaxAge = (int) refreshTokenExpiry / 60;
//        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
//        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);
//
//        return ApiResponseUtill.success("token", accessToken.getToken());
//    }
//
//    @GetMapping("/refresh")
//    public ApiResponseUtill refreshToken (HttpServletRequest request, HttpServletResponse response) {
//        // access token 확인
//        String accessToken = HeaderUtil.getAccessToken(request);
//        AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
//        if (!authToken.validate()) {
//            return ApiResponseUtill.invalidAccessToken();
//        }
//
//        // expired access token 인지 확인
//        Claims claims = authToken.getExpiredTokenClaims();
//        if (claims == null) {
//            return ApiResponseUtill.notExpiredTokenYet();
//        }
//
//        String userId = claims.getSubject();
//        RoleType roleType = RoleType.of(claims.get("role", String.class));
//
//        // refresh token
//        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
//                .map(Cookie::getValue)
//                .orElse((null));
//        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);
//
//        if (authRefreshToken.validate()) {
//            return ApiResponseUtill.invalidRefreshToken();
//        }
//
//        // userId refresh token 으로 DB 확인
//        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserIdAndRefreshToken(userId, refreshToken);
//        if (userRefreshToken == null) {
//            return ApiResponseUtill.invalidRefreshToken();
//        }
//
//        Date now = new Date();
//        AuthToken newAccessToken = tokenProvider.createAuthToken(
//                userId,
//                roleType.getCode(),
//                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
//        );
//
//        long validTime = authRefreshToken.getTokenClaims().getExpiration().getTime() - now.getTime();
//
//        // refresh 토큰 기간이 3일 이하로 남은 경우, refresh 토큰 갱신
//        if (validTime <= THREE_DAYS_MSEC) {
//            // refresh 토큰 설정
//            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
//
//            authRefreshToken = tokenProvider.createAuthToken(
//                    appProperties.getAuth().getTokenSecret(),
//                    new Date(now.getTime() + refreshTokenExpiry)
//            );
//
//            // DB에 refresh 토큰 업데이트
//            userRefreshToken.setRefreshToken(authRefreshToken.getToken());
//
//            int cookieMaxAge = (int) refreshTokenExpiry / 60;
//            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
//            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge);
//        }
//
//        return ApiResponseUtill.success("token", newAccessToken.getToken());    }
//}
