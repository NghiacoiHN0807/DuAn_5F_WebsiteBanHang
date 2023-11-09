package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.config.UserService;
import com.example.fullstackbackend.config.jwt.JwtTokenProvider;
import com.example.fullstackbackend.config.payload.LoginRequest;
import com.example.fullstackbackend.config.payload.LoginResponse;
import com.example.fullstackbackend.config.payload.RandomStuff;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class SecurityController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponse authenticateUser(@Valid
                                          @RequestBody LoginRequest loginRequest) {

        // Authenticate from username and password.
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Return jwt to user.
        String jwt = tokenProvider.generateToken(userDetails);

        return new LoginResponse(jwt);
    }

    // API test
    @GetMapping("/random")
    public RandomStuff randomStuff() {
        return new RandomStuff("JWT Hợp lệ mới có thể thấy được message này");
    }

    @GetMapping("/detail-user")
    public UserDetails deatilUser(HttpServletRequest request) {
        // Get Token
        String token = request.getHeader("Authorization").substring(7);
        System.out.println("Token: " + token);
        // Get user email
        String userId = tokenProvider.getUserIdFromJWT(token);
        System.out.println("userId: " + userId);
        // Return get user
        return userService.loadUserByUsername(userId);
    }
}
