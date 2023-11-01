package com.example.fullstackbackend.config;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class MySecurityConfiguration {

    private final UserService userService;

    //    @Bean
//    public PasswordEncoder passwordEncoder() {
//        // Password encoder, for Spring Security to use to encrypt user passwords
//        return new BCryptPasswordEncoder();
//    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Primary
    @Bean
    public AuthenticationManagerBuilder configureAuth(AuthenticationManagerBuilder auth) throws Exception {
        System.out.println("auth: " + auth);
        auth.userDetailsService(userService) // Provide userservice for spring security
                .passwordEncoder(passwordEncoder()); // Provide password encoder
        return auth;
    }

    @Qualifier
    @Bean
    public SecurityFilterChain configureHttp(HttpSecurity http) throws Exception {
        System.out.println("http: " + http);
        return http.authorizeHttpRequests(
                        req ->
                                req
                                        .requestMatchers("/")
                                        .permitAll().requestMatchers("/tai-khoan-khach-hang/*")
                                        .hasRole("ADMIN").requestMatchers("/tai-khoan/*")
                                        .hasRole("STAFF").anyRequest().authenticated())
                .formLogin(login -> login.loginProcessingUrl("/chat-lieu/view-all"))
                .logout(logout -> logout.logoutUrl("/logout"))
                .csrf(csrf -> csrf.disable()).build();
    }


}