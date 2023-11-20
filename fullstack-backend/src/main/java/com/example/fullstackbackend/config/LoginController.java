package com.example.fullstackbackend.config;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.services.TaiKhoanKhachHangSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    private TaiKhoanKhachHangSevice TaiKhoanKhachHangKHSevice;

    @PostMapping("/add")
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


}
