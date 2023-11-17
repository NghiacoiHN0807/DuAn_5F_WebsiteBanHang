package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.services.TaiKhoanNhanVienService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tai-khoan/")
@CrossOrigin("http://localhost:3000/")
@Secured("ADMIN")
public class TaiKhoanNhanVienController {
    @Autowired
    private TaiKhoanNhanVienService taiKhoanNhanVienService;

    @GetMapping("view-all")
    public Page<TaiKhoan> viewAll(@RequestParam(defaultValue = "0", value = "size1") Integer page,
                                  @RequestParam(defaultValue = "15", value = "size2") Integer size,
                                  @RequestParam("p") Optional<Integer> p) {
        return taiKhoanNhanVienService.chucVu(p.orElse(page), size);
    }

    @GetMapping("view-alls")
    public List<TaiKhoan> viewAlll() {
        return taiKhoanNhanVienService.getAll();

    }

    @PostMapping("add")
    public TaiKhoan add(@Valid @RequestBody TaiKhoan taiKhoan,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return taiKhoanNhanVienService.add(taiKhoan);
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
    public TaiKhoan update(@PathVariable("id") Integer id, @RequestBody TaiKhoan taiKhoan, BindingResult bindingResult) {
//        taiKhoanNhanVien.setIdTaiKhoan(id);
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return taiKhoanNhanVienService.update(taiKhoan, id);
        }
    }


}