package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.exception.TaiKhoanKHNotFoundException;
import com.example.fullstackbackend.services.TaiKhoanKhachHangSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
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
    public Page<TaiKhoan> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                  @RequestParam(defaultValue = "5") Integer size,
                                  @RequestParam("p") Optional<Integer> p) {
        Page<TaiKhoan> TaiKhoanKhachHangs = TaiKhoanKhachHangKHSevice.Page(p.orElse(page), size);
        return TaiKhoanKhachHangs;
    }

    @PostMapping("add")
    public TaiKhoan add(@Valid @RequestBody TaiKhoan TaiKhoan,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return TaiKhoanKhachHangKHSevice.add(TaiKhoan);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<TaiKhoan> detail(@PathVariable("id") Integer id,
                                     @RequestParam(defaultValue = "0") Integer page,
                                     @RequestParam(defaultValue = "5") Integer size, @RequestParam("p")
                         Optional<Integer> p, Model model) {

        TaiKhoan TaiKhoan = new TaiKhoan();
        model.addAttribute("add", TaiKhoan);

        Optional<TaiKhoan> TaiKhoanKhachHang1 = TaiKhoanKhachHangKHSevice.detail(id);
        model.addAttribute("getOne", TaiKhoanKhachHang1.get());

        Page<TaiKhoan> TaiKhoanKhachHangs = TaiKhoanKhachHangKHSevice.Page(p.orElse(page), size);
        model.addAttribute("TaiKhoanKhachHangs", TaiKhoanKhachHangs);

        return TaiKhoanKhachHang1;
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

    @GetMapping("view-update/{id}")
    public Optional<TaiKhoan> viewUpdate(@PathVariable("id") Integer id, Model model) {

        TaiKhoan TaiKhoan = new TaiKhoan();
        model.addAttribute("update", TaiKhoan);

        Optional<TaiKhoan> taiKhoanKhachHang = TaiKhoanKhachHangKHSevice.detail(id);
        model.addAttribute("getOne", taiKhoanKhachHang.get());

        return taiKhoanKhachHang;
    }

    @PostMapping("update")
    public TaiKhoan update(@RequestBody TaiKhoan TaiKhoan,BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
        return TaiKhoanKhachHangKHSevice.update(TaiKhoan);
    }
    }
}
