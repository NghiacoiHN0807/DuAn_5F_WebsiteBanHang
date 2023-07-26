package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.TaiKhoanKhachHang;
import com.example.fullstackbackend.exception.TaiKhoanKHNotFoundException;
import com.example.fullstackbackend.services.TaiKhoanKhachHangSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tai-khoan-khach-hang/")
@CrossOrigin("http://localhost:3000/")
public class TaiKhoanKhachHangController {
    @Autowired
    private TaiKhoanKhachHangSevice TaiKhoanKhachHangKHSevice;

    @GetMapping("view-all")
    public Page<TaiKhoanKhachHang> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                           @RequestParam(defaultValue = "5") Integer size,
                                           @RequestParam("p") Optional<Integer> p) {

        return TaiKhoanKhachHangKHSevice.Page(p.orElse(page), size);
    }

    @PostMapping("add")
    public TaiKhoanKhachHang add(@Valid @RequestBody TaiKhoanKhachHang TaiKhoanKhachHang,
                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return TaiKhoanKhachHangKHSevice.add(TaiKhoanKhachHang);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<TaiKhoanKhachHang> detail(@PathVariable("id") Integer id
    ) {

        return TaiKhoanKhachHangKHSevice.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!TaiKhoanKhachHangKHSevice.checkExists(id)) {
            throw new TaiKhoanKHNotFoundException(id);
        } else {
            TaiKhoanKhachHangKHSevice.delete(id);
            return "";
        }
    }


    @PostMapping("update")
    public TaiKhoanKhachHang update(@RequestBody TaiKhoanKhachHang TaiKhoanKhachHang, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return TaiKhoanKhachHangKHSevice.update(TaiKhoanKhachHang);
        }
    }
}
