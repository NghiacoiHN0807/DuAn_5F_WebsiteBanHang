package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.exception.TaiKhoanKHNotFoundException;
import com.example.fullstackbackend.services.TaiKhoanKhachHangSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/tai-khoan-khach-hang/")
@CrossOrigin("http://localhost:3000/")
public class TaiKhoanKhachHangController {
    @Autowired
    private TaiKhoanKhachHangSevice TaiKhoanKhachHangKHSevice;

    @GetMapping("view-all")
    public Page<TaiKhoan> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                  @RequestParam(defaultValue = "15") Integer size,
                                  @RequestParam("p") Optional<Integer> p) {

        return TaiKhoanKhachHangKHSevice.Page(p.orElse(page), size);
    }

    @GetMapping("view-all-kh")
    public List<TaiKhoan> viewAllKH() {
        return TaiKhoanKhachHangKHSevice.PageKhachHang();
    }

    @PostMapping("add")
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
            TaiKhoan addTK = TaiKhoanKhachHangKHSevice.add(taiKhoankh);
            return ResponseEntity.ok(addTK);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<TaiKhoan> detail(@PathVariable("id") String id
    ) {
        return TaiKhoanKhachHangKHSevice.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public Boolean delete(@PathVariable("id") Integer id) {
        if (!TaiKhoanKhachHangKHSevice.checkExists(id)) {
            throw new TaiKhoanKHNotFoundException(id);
        } else {
            TaiKhoanKhachHangKHSevice.delete(id);
            return true;
        }
    }


    @PostMapping("update")
    public ResponseEntity<?> update(@Valid @RequestBody TaiKhoan taiKhoankh,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
            if (taiKhoankh.getMatKhau().isBlank()) {
                taiKhoankh.setMatKhau(taiKhoankh.generateRandomPassword());
            }

            TaiKhoan updateTK = TaiKhoanKhachHangKHSevice.update(taiKhoankh);
            return ResponseEntity.ok(updateTK);
        }
    }


}
