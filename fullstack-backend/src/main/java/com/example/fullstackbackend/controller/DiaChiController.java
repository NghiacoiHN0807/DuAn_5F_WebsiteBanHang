package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.DiaChi;
import com.example.fullstackbackend.exception.DiaChiNotFoundException;
import com.example.fullstackbackend.services.DiaChiSevice;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dia-chi/")
@CrossOrigin("http://localhost:3000/")
public class DiaChiController {
    @Autowired
    private DiaChiSevice diaChiSevice;

    @GetMapping("/view-all")
    public List<DiaChi> viewAll() {
        return diaChiSevice.getAll();
    }

    @GetMapping("/tai-khoan/")
    public List<DiaChi> viewAllTK(@RequestParam("m") String maTaiKhoan
                                  ) {
        return diaChiSevice.getAllTK(maTaiKhoan);
    }
    @GetMapping("/tai-khoan-client/")
    public List<DiaChi> viewAllByTK(@RequestParam("m") String maTaiKhoan
                                  ) {
        return diaChiSevice.getAllByTK(maTaiKhoan);
    }
    @GetMapping("/tai-khoan-count/")
    public Long countDiaChi(@RequestParam("m") String maTaiKhoan
                                  ) {
        return diaChiSevice.CheckDiaChi(maTaiKhoan);
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@Valid @RequestBody DiaChi diaChi,
                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errorMap);
        } else {
            if(diaChiSevice.Check5DiaChi(diaChi.getTaiKhoan().getMaTaiKhoan())){
                Map<String, String> errorMap = new HashMap<>();
                errorMap.put("error", "Giới Hạn Địa Chỉ Hoạt Động là 5");
                return ResponseEntity.badRequest().body(errorMap);
            }

            DiaChi addedDiaChi = diaChiSevice.add(diaChi);
            return ResponseEntity.ok(addedDiaChi);
        }
    }




    @GetMapping("detail/{id}")
    public Optional<DiaChi> detail(@PathVariable("id") Integer id) {
        return diaChiSevice.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public boolean delete(@PathVariable("id") Integer id) {
        if (!diaChiSevice.checkExists(id)) {
            throw new DiaChiNotFoundException(id);

        } else {
            diaChiSevice.delete(id);
            return true;
        }
    }


    @PostMapping("update")
    public ResponseEntity<?> update(@Valid @RequestBody DiaChi diaChi,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(errorMap);
        } else {
            DiaChi updatedDiaChi = diaChiSevice.update(diaChi);
            return ResponseEntity.ok(updatedDiaChi);
        }
    }

}
