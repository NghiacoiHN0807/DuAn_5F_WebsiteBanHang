package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.services.TaiKhoanNhanVienService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @DeleteMapping("delete/{id}/{trangThai}")
    ResponseEntity<?> delete(@PathVariable("id") Integer id,
                             @PathVariable("trangThai") Integer trangThai) {
        Boolean exists = taiKhoanNhanVienService.existsById(id);
        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy id"
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                taiKhoanNhanVienService.delete(id, trangThai)
        );
    }

    @DeleteMapping("delete-all")
    ResponseEntity<?> deleteAll(@RequestBody List<Integer> id) {
        if (id.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy id"
            );
        } else {
            Boolean deleteAll = taiKhoanNhanVienService.deleteAll(id);
            if (deleteAll) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        "Delete success"
                );
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        "Delete false"
                );
            }
        }
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


}