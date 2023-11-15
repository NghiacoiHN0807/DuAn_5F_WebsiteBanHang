package com.example.fullstackbackend.config;


import com.example.fullstackbackend.config.jwt.JwtAuthenticationFilter;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class MySecurityConfiguration {

    private final UserService userService;

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
                                req
                                        .requestMatchers("/", "/add", "/api/**","san-pham/**", "chi-tiet-san-pham/**").permitAll()
                                        .requestMatchers("/**").hasRole("ADMIN")
                                        .requestMatchers("/tai-khoan/view-all").hasRole("STAFF")
                                        .requestMatchers("/hoa-don/view-all").hasRole("CUSTOMER")
                                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .csrf(csrf -> csrf.disable())
                .cors(a -> a.configure(http))
                .build();
    }

}