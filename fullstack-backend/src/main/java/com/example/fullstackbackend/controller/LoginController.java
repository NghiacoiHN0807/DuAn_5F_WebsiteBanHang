package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.GioHang;
import com.example.fullstackbackend.repository.GioHangReponsitory;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
public class LoginController {

    private final JwtDecoder jwtDecoder;


    @Autowired
    private UserService userService;

    @Autowired
    private TaiKhoanKhachHangSevice TaiKhoanKhachHangKHSevice;

    @Autowired
    private GioHangReponsitory gioHangReponsitory;

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
            GioHang gioHang = new GioHang();
            gioHang.setIdKh(addTK);
            gioHang.setMaGioHang(null);
            gioHang.setNgayTao(null);
            gioHang.setTrangThai(0);
            gioHangReponsitory.save(gioHang);

            return ResponseEntity.ok(addTK);
        }
    }
    @PostMapping("/forgetPassword")
    public ResponseEntity<?> forgetPassword(@Valid @RequestBody Map<String, String> request,
                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
            String email = request.get("email");
            String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
            Pattern pattern = Pattern.compile(emailRegex);
            Matcher matcher = pattern.matcher(email);

            if(email.isBlank()){
                Map<String, String> errorMap = new HashMap<>();
                errorMap.put("email", "Email đang trống");
                return ResponseEntity.badRequest().body(errorMap);
            }
            if (!matcher.matches()) {
                Map<String, String> errorMap = new HashMap<>();
                errorMap.put("email", "Email không đúng định dạng");
                return ResponseEntity.badRequest().body(errorMap);
            }
            if (!userService.checkMailExists(email)) {
                Map<String, String> errorMap = new HashMap<>();
                errorMap.put("email", "Email không tồn tại trong website");
                return ResponseEntity.badRequest().body(errorMap);
            } else if (userService.checkBan(email)) {
                Map<String, String> errorMap = new HashMap<>();
                errorMap.put("email", "Tài Khoản đã bị khóa");
                return ResponseEntity.badRequest().body(errorMap);
            }
            userService.forgetPassword(email);
            Map<String, String> text = new HashMap<>();
            text.put("email","Mật khẩu mới Đã được gửi");
            return ResponseEntity.ok(text);
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
            TaiKhoanUser tku =      userService.add(userEntity);
            TaiKhoan tk = new TaiKhoan();
            tk.setIdTaiKhoan(tku.getIdTaiKhoan());
            tk.setIdChucVu(tku.getIdChucVu());
            GioHang gioHang = new GioHang();
            gioHang.setIdKh(tk);
            gioHang.setMaGioHang(null);
            gioHang.setNgayTao(null);
            gioHang.setTrangThai(0);
            gioHangReponsitory.save(gioHang);
            UserDetails userDetails = new CustomUserDetails(userEntity);
            return tokenProvider.generateToken(userDetails);
        }
    }

}
