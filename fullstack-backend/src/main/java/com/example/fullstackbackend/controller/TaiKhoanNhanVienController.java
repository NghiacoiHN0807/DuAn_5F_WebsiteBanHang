package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.services.TaiKhoanNhanVienService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/tai-khoan/")
@CrossOrigin("http://localhost:3000/")

public class TaiKhoanNhanVienController {
    @Autowired
    private TaiKhoanNhanVienService taiKhoanNhanVienService;

    @GetMapping("view-all")
    public List<TaiKhoan> viewAll() {
        return taiKhoanNhanVienService.chucVu();
    }

    @GetMapping("view-alls")
    public List<TaiKhoan> viewAlll() {
        return taiKhoanNhanVienService.getAll();

    }

    @PostMapping("add")
    public ResponseEntity<?> add(@Valid @RequestBody TaiKhoan taiKhoan,
                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
            return ResponseEntity.ok(taiKhoanNhanVienService.add(taiKhoan));
        }
    }

    @GetMapping("detail/{id}")
    public Optional<TaiKhoan> detail(@PathVariable("id") Integer id
    ) {
        return taiKhoanNhanVienService.detail(id);
    }

    @PatchMapping("delete/{id}")
    public TaiKhoan delete(@PathVariable("id") Integer id
    ) {
        return taiKhoanNhanVienService.delete(id);
    }


    @PutMapping("update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Integer id,
                                    @Valid
                                    @RequestBody TaiKhoan taiKhoan,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errorMap);
        } else {
            return ResponseEntity.ok(taiKhoanNhanVienService.update(taiKhoan, id));
        }
    }

    @PostMapping("changePass")
    public ResponseEntity<?> changePass(@Valid @RequestBody TaiKhoan taiKhoankh, @RequestParam("pass") String pass,
                                        @RequestParam("newPass") String newPass
    ) {
        Map<String, String> textTo = new HashMap<>();
        Boolean check = taiKhoanNhanVienService.changePass(taiKhoankh, pass, newPass);

        if (check) {
            textTo.put("Check", "Mật Khẩu Đã Được Đổi");
            return ResponseEntity.ok(textTo);
        }
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("matKhau", "Mật khẩu không đúng");
        return ResponseEntity.badRequest().body(errorMap);

    }

}