package com.example.fullstackbackend.config.jwt;

import com.example.fullstackbackend.config.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtTokenProvider {

    // This code is secret, just only sever see that
    private final String JWT_SECRET = "duan_5f";

    // Set time for jwt
    private final Long JWT_EXPIRATION = 604800000L;

    // Create Json JWT from user's information
    public String generateToken(String userDetails) {
        // Set date time now expiry
        Date now = new Date();
        Date expiryDay = new Date(now.getTime() + JWT_EXPIRATION);
        // Set return JWT
        return Jwts.builder().
                setSubject(userDetails)
                .setIssuedAt(now)
                .setExpiration(expiryDay)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET.getBytes())
                .compact();
    }

//    public String getJWTToken(String username) {
//        String secretKey = "mySecretKey";
//        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
//                .commaSeparatedStringToAuthorityList("ROLE_USER");
//
//        String token = Jwts
//                .builder()
//                .setId("softtekJWT")
//                .setSubject(username)
//                .claim("authorities",
//                        grantedAuthorities.stream()
//                                .map(GrantedAuthority::getAuthority)
//                                .collect(Collectors.toList()))
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 600000))
//                .signWith(SignatureAlgorithm.HS512,
//                        secretKey.getBytes()).compact();
//
//        return "Bearer " + token;
//    }

    // Get user's information from JWT
    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(JWT_SECRET)
                .parseClaimsJws(token).getBody();
        System.out.println("claims: "+ claims);
        return Long.parseLong(claims.getSubject());
    }

    ;

    public Boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
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
