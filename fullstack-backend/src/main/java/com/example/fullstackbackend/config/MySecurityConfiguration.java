package com.example.fullstackbackend.config;


import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.repository.TaiKhoanKhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class MySecurityConfiguration {

    @Autowired
    private TaiKhoanKhachHangRepository taiKhoanKhachHangRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        //PassWordEncoder, Spring user encoding
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService authentication() {
        PasswordEncoder encoder = passwordEncoder();

        List<TaiKhoan> taiKhoanList = taiKhoanKhachHangRepository.findAll();

        List<UserDetails> userDetailsList = new ArrayList<>();

        for (TaiKhoan tk : taiKhoanList) {

            UserDetails user = User.builder()
                    .username(tk.getEmail())
                    .password(encoder.encode(tk.getMatKhau()))
                    .roles(tk.getIdChucVu().getTenCv())
                    .build();

            userDetailsList.add(user);
        }
        return new InMemoryUserDetailsManager(userDetailsList);
    }

//    @Bean
//    public UserDetailsService authentication() {
//        PasswordEncoder encoder = passwordEncoder();
//        UserDetails taiKhoan = User.builder()
//                .username(taiKhoanKhachHangRepository.finAll().get(0).getEmail())
//                .password(encoder.encode(taiKhoanKhachHangRepository.finAll().get(0).getEmail()))
//                .roles("ROLE_ADMIN")
//                .build();
//        return new InMemoryUserDetailsManager(taiKhoan);
//    }

    @Bean
    public SecurityFilterChain authorization(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/", "/chat-lieu/*").permitAll()
                                .requestMatchers("/tai-khoan-khach-hang/*").hasRole("ADMIN")
                                .requestMatchers("/tai-khoan/*").hasRole("STAFF")
                                .anyRequest().authenticated()
                )
                .formLogin(login ->
                        login
                                .loginProcessingUrl("/login")
                )
                .logout(logout ->
                        logout
                                .logoutUrl("/logout")
                );

        return httpSecurity.build();
    }

}