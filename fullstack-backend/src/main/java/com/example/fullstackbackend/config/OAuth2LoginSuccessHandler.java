package com.example.fullstackbackend.config;

import com.example.fullstackbackend.config.user.TaiKhoanUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserService userService;

    @Value("${fontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {

        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        if ("google".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {
            DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
            Map<String, Object> attributes = principal.getAttributes();
            String email = attributes.getOrDefault("email", "").toString();
            String name = attributes.getOrDefault("name", "").toString();
            userService.findByEmail(email)
                    .ifPresentOrElse(user -> {
                        CustomUserDetails userDetails = new CustomUserDetails(user);
                        List<SimpleGrantedAuthority> authorities = userDetails.getAuthorities().stream()
                                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                                .collect(Collectors.toList());
                        Authentication securityAuth = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                        System.out.println("Role:" +securityAuth);
                        SecurityContextHolder.getContext().setAuthentication(securityAuth);
                    }, () -> {
                        TaiKhoanUser userEntity = new TaiKhoanUser();
                        userEntity.setEmail(email);
                        userEntity.setTen(name);
                        userEntity.setTrangThai(0);
                        userService.add(userEntity);
                        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
                        CustomUserDetails userDetails = new CustomUserDetails(userEntity);
                        Authentication securityAuth = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                        System.out.println("Role:" +securityAuth);
                        SecurityContextHolder.getContext().setAuthentication(securityAuth);
                    });
        }

        super.onAuthenticationSuccess(request, response, authentication);
    }
}