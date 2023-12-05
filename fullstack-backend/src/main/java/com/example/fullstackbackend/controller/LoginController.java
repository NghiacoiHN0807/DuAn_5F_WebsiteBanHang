package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.security.CustomUserDetails;
import com.example.fullstackbackend.services.UserService;
import com.example.fullstackbackend.security.jwt.JwtTokenProvider;
import com.example.fullstackbackend.security.user.TaiKhoanUser;
import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.services.TaiKhoanKhachHangSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class LoginController {

    private final JwtDecoder jwtDecoder;


    @Autowired
    private UserService userService;

    @Autowired
    private TaiKhoanKhachHangSevice TaiKhoanKhachHangKHSevice;

    @Autowired
    public LoginController(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> add(@Valid @RequestBody TaiKhoan taiKhoankh,
                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {

            String email = taiKhoankh.getEmail();
            if (TaiKhoanKhachHangKHSevice.checkMailExists(email)) {
                Map<String, String> errorMap = new HashMap<>();
                errorMap.put("email", "Email đã tồn tại");
                return ResponseEntity.badRequest().body(errorMap);
            }

            TaiKhoan addTK = TaiKhoanKhachHangKHSevice.add(taiKhoankh);
            return ResponseEntity.ok(addTK);
        }
    }

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/google-login")
    public String googleSignIn(@RequestBody String idToken) {
        Jwt jwt = jwtDecoder.decode(idToken);
        Map<String, Object> claims = jwt.getClaims();
        String email = (String) claims.get("email");
        String givenName = (String) claims.get("given_name");
        String familyName = (String) claims.get("family_name");
        if (userService.checkMailExists(email)) {
            UserDetails userDetails = userService.loadUserByUsername(email);
            return tokenProvider.generateToken(userDetails);
        } else {
            TaiKhoanUser userEntity = new TaiKhoanUser();
            userEntity.setEmail(email);
            userEntity.setHo(familyName);
            userEntity.setTen(givenName);
            userEntity.setTrangThai(0);
            userEntity.setSdt(null);
            userService.add(userEntity);
            UserDetails userDetails = new CustomUserDetails(userEntity);
            return tokenProvider.generateToken(userDetails);
        }
    }

}
