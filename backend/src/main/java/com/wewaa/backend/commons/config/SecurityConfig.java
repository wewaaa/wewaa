//package com.wewaa.backend.commons.config;
//
//import com.wewaa.backend.commons.config.properties.AppProperties;
//import com.wewaa.backend.commons.config.properties.CorsProperties;
//import com.wewaa.backend.social.exception.RestAuthenticationEntryPoint;
//import com.wewaa.backend.social.filter.TokenAuthenticationFilter;
//import com.wewaa.backend.social.handler.OAuth2AuthenticationFailureHandler;
//import com.wewaa.backend.social.handler.OAuth2AuthenticationSuccessHandler;
//import com.wewaa.backend.social.handler.TokenAccessDeniedHandler;
//import com.wewaa.backend.social.model.repository.UserRefreshTokenRepository;
//import com.wewaa.backend.social.model.type.RoleType;
//import com.wewaa.backend.social.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
//import com.wewaa.backend.social.service.CustomOAuth2UserService;
//import com.wewaa.backend.social.service.CustomUserDetailsService;
//import com.wewaa.backend.social.token.AuthTokenProvider;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.BeanIds;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsUtils;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.Arrays;
//
//@Configuration
//@RequiredArgsConstructor
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    private final CorsProperties corsProperties;
//    private final AppProperties appProperties;
//    private final AuthTokenProvider tokenProvider;
//    private final CustomUserDetailsService userDetailsService;
//    private final CustomOAuth2UserService oAuth2UserService;
//    private final TokenAccessDeniedHandler tokenAccessDeniedHandler;
//    private final UserRefreshTokenRepository userRefreshTokenRepository;
//
//    private final String[] SWAGER_WHITELIST ={"/v3/api-docs", "/configuration/ui", "/swagger-resources",
//            "/configuration/security", "/swagger-ui.html", "/webjars/**","/swagger/**"};
//    /*
//     * UserDetailsService ??????
//     * */
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService)
//                .passwordEncoder(passwordEncoder());
//    }
//
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web.ignoring()
//                .antMatchers("/static/css/**, /static/js/**, *.ico");
//        // swagger
//        web.ignoring()
//                .antMatchers( SWAGER_WHITELIST);
//
//        web.ignoring()
//                .antMatchers( "/api/v1/image/**");
//    }
//
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .cors()
//            .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//            .and()
//                .csrf().disable()
//                .formLogin().disable()
//                .httpBasic().disable()
//                .exceptionHandling()
//                // ?????? ?????? ????????? ???
//                .authenticationEntryPoint(new RestAuthenticationEntryPoint())
//                // ?????? ????????? ?????? ????????? ???????????? ?????? ??????
//                .accessDeniedHandler(tokenAccessDeniedHandler)
//            .and()
//                .authorizeRequests()
//                // cors setting ?????? - ??????????????? ????????? preflighted request??? ?????? ?????? ????????? ????????? ????????? ???
//                // OPTIONS -> "Method"
//                .antMatchers("/swagger-ui/**","/swagger-resources/**").permitAll()
//                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
//                .antMatchers("/api/**").hasAnyAuthority(RoleType.USER.getCode())
//                .antMatchers("/api/**/admin/**").hasAnyAuthority(RoleType.ADMIN.getCode())
//                .anyRequest().authenticated()
//            .and()
//                .oauth2Login()
//                .authorizationEndpoint()
//                .baseUri("/oauth2/authorization")
//                .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
//                .and()
//                .redirectionEndpoint()
//                .baseUri("/*/oauth2/code/*")
//            .and()
//                .userInfoEndpoint()
//                .userService(oAuth2UserService)
//            .and()
//                .successHandler(oAuth2AuthenticationSuccessHandler())
//                .failureHandler(oAuth2AuthenticationFailureHandler());
//        // spring security??? ???????????? ?????? ????????? ????????? ?????? ??????.
//        // http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
//    }
//
//    /*
//    * auth ????????? ??????
//    * */
//    @Override
//    @Bean(BeanIds.AUTHENTICATION_MANAGER)
//    protected AuthenticationManager authenticationManager() throws Exception {
//        return super.authenticationManager();
//    }
//    /*
//     * security ?????? ???, ????????? ????????? ??????
//     * */
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    /*
//     * ?????? ?????? ??????
//     * */
//    @Bean
//    public TokenAuthenticationFilter tokenAuthenticationFilter() {
//        return new TokenAuthenticationFilter(tokenProvider);
//    }
//
//    /*
//     * ?????? ?????? ?????? Repository
//     * ?????? ????????? ?????? ?????? ????????? ??? ??????.
//     * */
//    @Bean
//    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
//        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
//    }
//
//    /*
//     * Oauth ?????? ?????? ?????????
//     * */
//    @Bean
//    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
//        return new OAuth2AuthenticationSuccessHandler(
//                tokenProvider,
//                appProperties,
//                userRefreshTokenRepository,
//                oAuth2AuthorizationRequestBasedOnCookieRepository()
//        );
//    }
//
//    /*
//     * Oauth ?????? ?????? ?????????
//     * */
//    @Bean
//    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
//        return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
//    }
//
//    /*
//     * Cors ??????
//     * */
//    @Bean
//    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
//        UrlBasedCorsConfigurationSource corsConfigSource = new UrlBasedCorsConfigurationSource();
//
//        CorsConfiguration corsConfig = new CorsConfiguration();
//        corsConfig.setAllowedHeaders(Arrays.asList(corsProperties.getAllowedHeaders().split(",")));
//        corsConfig.setAllowedMethods(Arrays.asList(corsProperties.getAllowedMethods().split(",")));
//        corsConfig.setAllowedOrigins(Arrays.asList(corsProperties.getAllowedOrigins().split(",")));
//        corsConfig.setAllowCredentials(true);
//        corsConfig.setMaxAge(corsConfig.getMaxAge());
//
//        corsConfigSource.registerCorsConfiguration("/**", corsConfig);
//        return corsConfigSource;
//    }
//}
