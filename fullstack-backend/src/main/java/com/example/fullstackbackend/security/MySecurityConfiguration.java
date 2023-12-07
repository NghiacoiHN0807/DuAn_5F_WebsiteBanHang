package com.example.fullstackbackend.security;


import com.example.fullstackbackend.security.jwt.JwtAuthenticationFilter;
import com.example.fullstackbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class MySecurityConfiguration {



    private final UserService userService;

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withJwkSetUri("https://www.googleapis.com/oauth2/v3/certs").build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration auth) throws Exception {
        // Get AuthenticationManager bean
        return auth.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Password encoder, for Spring Security to use to encrypt user passwords
        return new BCryptPasswordEncoder();
    }

    @Primary
    @Bean
    protected AuthenticationManagerBuilder configureAuth(AuthenticationManagerBuilder auth) throws Exception {
        System.out.println("auth: " + auth);
        auth.userDetailsService(userService) // Provide userservice for spring security
                .passwordEncoder(passwordEncoder()); // Provide password encoder
        return auth;
    }

    @Bean
    protected SecurityFilterChain configureHttp(HttpSecurity http) throws Exception {
        System.out.println("http: " + http);
        return http.authorizeHttpRequests(
                        req ->
                                req.requestMatchers("/","/signUp", "/google-login", "/anh/**", "/gio-hang-chi-tiet/**", "/add", "/api/**", "/san-pham/**", "chi-tiet-san-pham/**", "/hoa-don/**", "/hoa-don-chi-tiet/**", "/chat-lieu/**", "/loai-sp/**", "/xuat-xu/**", "/loai-co-ao/**", "/ong-tay-ao/**", "/mau-sac/**", "/size/**").permitAll()
                                        .requestMatchers("/**").hasRole("ADMIN")
                                        .requestMatchers("/**").hasRole("STAFF")
                                        .requestMatchers("/tai-khoan-khach-hang/**", "/hoa-don/**", "/gio-hang-chi-tiet/**", "/gio-hang/**", "/hoa-don-chi-tiet/**", "/san-pham/**", "chi-tiet-san-pham/**").hasRole("CUSTOMER")
                                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(a -> a.configure(http))
                .build();
    }

}
