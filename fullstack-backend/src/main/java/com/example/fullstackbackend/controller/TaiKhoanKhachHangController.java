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
    private TaiKhoanKhachHangSevice TaiKhoanKHSevice;

    @GetMapping("view-all")
    public Page<TaiKhoan> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "5") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        Page<TaiKhoan> TaiKhoans = TaiKhoanKHSevice.Page(p.orElse(page), size);
        return TaiKhoans;
    }

    @PostMapping("add")
    public TaiKhoan add(@Valid @RequestBody TaiKhoan TaiKhoan,
                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return TaiKhoanKHSevice.add(TaiKhoan);
        }
    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id") Integer id,
                         @RequestParam(defaultValue = "0") Integer page,
                         @RequestParam(defaultValue = "5") Integer size, @RequestParam("p")
                             Optional<Integer> p, Model model) {

        TaiKhoan TaiKhoan = new TaiKhoan();
        model.addAttribute("add", TaiKhoan);

        Optional<TaiKhoan> TaiKhoan1 = TaiKhoanKHSevice.detail(id);
        model.addAttribute("getOne", TaiKhoan1.get());

        Page<TaiKhoan> taiKhoans = TaiKhoanKHSevice.Page(p.orElse(page), size);
        model.addAttribute("TaiKhoans", taiKhoans);

        return "TaiKhoan";
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!TaiKhoanKHSevice.checkExists(id)) {
            throw new TaiKhoanKHNotFoundException(id);
        } else {
            TaiKhoanKHSevice.delete(id);
            return "";
        }
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id") Integer id, Model model) {

        TaiKhoan TaiKhoan = new TaiKhoan();
        model.addAttribute("update", TaiKhoan);

        Optional<TaiKhoan> taiKhoan = TaiKhoanKHSevice.detail(id);
        model.addAttribute("getOne", taiKhoan.get());

        return "Update-TaiKhoan";
    }

    @PostMapping("update")
    public TaiKhoan update(@RequestBody TaiKhoan TaiKhoan) {
        return TaiKhoanKHSevice.update(TaiKhoan);
    }
}
