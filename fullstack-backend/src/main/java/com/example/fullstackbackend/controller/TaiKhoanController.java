package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.services.TaiKhoanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/tai-khoan/")
@CrossOrigin("http://localhost:3000/")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanService taiKhoanService;

    @GetMapping("view-all")
    Page<TaiKhoan> viewAll(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size,
                           @RequestParam("p") Optional<Integer> p) {

        return taiKhoanService.phanTrang(page, size);
    }

    @PostMapping("add")
    public String add(@Valid @ModelAttribute("add") TaiKhoan taiKhoan,
                      BindingResult bindingResult, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size,
                      @RequestParam("p") Optional<Integer> p, Model model) {
        if (bindingResult.hasErrors()) {
            Page<TaiKhoan> phanTrang = taiKhoanService.phanTrang(p.orElse(page), size);
            model.addAttribute("phanTrang", phanTrang);
            return "TaiKhoan";
        } else {
            taiKhoanService.add(taiKhoan);
            return "redirect:/tai-khoan/view-all";
        }
    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id") Integer id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size, @RequestParam("p") Optional<Integer> p, Model model) {

        TaiKhoan taiKhoan = new TaiKhoan();
        model.addAttribute("add", taiKhoan);

        Optional<TaiKhoan> taiKhoan1 = taiKhoanService.detail(id);
        model.addAttribute("getOne", taiKhoan1.get());

        Page<TaiKhoan> phanTrang = taiKhoanService.phanTrang(p.orElse(page), size);
        model.addAttribute("phanTrang", phanTrang);

        return "TaiKhoan";
    }

    @GetMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id, Model model) {
        taiKhoanService.delete(id);
        return "redirect:/tai-khoan/view-all";
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id") Integer id, Model model) {

        TaiKhoan taiKhoan = new TaiKhoan();
        model.addAttribute("update", taiKhoan);

        Optional<TaiKhoan> taiKhoan1 = taiKhoanService.detail(id);
        model.addAttribute("getOne", taiKhoan1.get());

        return "Update-TaiKhoan";
    }

    @PostMapping("update")
    public String update(@ModelAttribute("update") TaiKhoan taiKhoan) {
        taiKhoanService.update(taiKhoan);
        return "redirect:/tai-khoan/view-all";
    }
}
