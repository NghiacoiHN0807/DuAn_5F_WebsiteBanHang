package com.example.fullstackbackend.config;


import com.example.fullstackbackend.config.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

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
        System.out.println("auth: " + auth.getDefaultUserDetailsService());
        auth.userDetailsService(userService) // Provide userservice for spring security
                .passwordEncoder(passwordEncoder()); // Provide password encoder
        return auth;
    }

    @Bean
    protected SecurityFilterChain configureHttp(HttpSecurity http) throws Exception {
        System.out.println("http: " + http);
        return http.authorizeHttpRequests(

                        req ->
                                req.requestMatchers("/", "/anh/**", "/gio-hang-chi-tiet/**", "/add", "/api/**", "/san-pham/**", "chi-tiet-san-pham/**", "/hoa-don/**", "/hoa-don-chi-tiet/**", "/tai-khoan-khach-hang/**", "/chat-lieu/**", "/loai-sp/**", "/xuat-xu/**", "/loai-co-ao/**", "/ong-tay-ao/**", "/mau-sac/**", "/size/**").permitAll()
                                        .requestMatchers("/tai-khoan/**").hasRole("ADMIN")
                                        .requestMatchers("/giam-gia/**", "/giam-gia-chi-tiet/**").hasAnyRole("ADMIN", "STAFF")
                                        .requestMatchers("/tai-khoan-khach-hang/**", "/hoa-don/**", "/hoa-don-chi-tiet/**", "/gio-hang-chi-tiet/**", "/gio-hang/**", "/payment-online/**", "/hinh-thuc-thanh-toan/**", "/lich-su-hoa-don/**").hasAnyRole("ADMIN", "STAFF", "CUSTOMER")
                                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .csrf(csrf -> csrf.disable())
                .cors(a -> a.configure(http))
                .build();
    }

}
