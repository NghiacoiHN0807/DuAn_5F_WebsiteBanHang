package com.example.fullstackbackend.config.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {

    // This code is secret, just only sever see that
    private final String JWT_SECRET = "NghiaSieuDepTrai";

    // Set time for jwt
    private final Long JWT_EXPIRATION = 60000000000L;

    // Create Json JWT from user's information
    public String generateToken(UserDetails stringJWT) {
        // Set date time now expiry
        Date now = new Date();
        Date expiryDay = new Date(now.getTime() + JWT_EXPIRATION);
        // Set return JWT
        return Jwts.builder()
                .setSubject(stringJWT.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDay)
                .claim("authorities", stringJWT.getAuthorities())
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET.getBytes())
                .compact();
    }

    // Get user's information from JWT
    public String getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(JWT_SECRET.getBytes())
                .parseClaimsJws(token).getBody();
        System.out.println("===claims: " + claims);
        return claims.getSubject();
    }


    public Boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET.getBytes()).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty");
        }
        return false;
    }
}
