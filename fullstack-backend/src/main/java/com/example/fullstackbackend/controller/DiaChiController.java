package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.DiaChi;
import com.example.fullstackbackend.exception.DiaChiNotFoundException;
import com.example.fullstackbackend.services.DiaChiSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/dia-chi/")
@CrossOrigin("http://localhost:3000/")
public class DiaChiController {
    @Autowired
    private DiaChiSevice DiaChiSevice;

    @GetMapping("view-all")
    public Page<DiaChi> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "5") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        Page<DiaChi> DiaChis = DiaChiSevice.Page(p.orElse(page), size);
        return DiaChis;
    }

    @PostMapping("add")
    public DiaChi add(@Valid @RequestBody DiaChi DiaChi,
                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return DiaChiSevice.add(DiaChi);
        }
    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id") Integer id,
                         @RequestParam(defaultValue = "0") Integer page,
                         @RequestParam(defaultValue = "5") Integer size, @RequestParam("p")
                             Optional<Integer> p, Model model) {

        DiaChi DiaChi = new DiaChi();
        model.addAttribute("add", DiaChi);

        Optional<DiaChi> DiaChi1 = DiaChiSevice.detail(id);
        model.addAttribute("getOne", DiaChi1.get());

        Page<DiaChi> diaChis = DiaChiSevice.Page(p.orElse(page), size);
        model.addAttribute("DiaChis", diaChis);

        return "DiaChi";
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!DiaChiSevice.checkExists(id)) {
            throw new DiaChiNotFoundException(id);
        } else {
            DiaChiSevice.delete(id);
            return "";
        }
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id") Integer id, Model model) {

        DiaChi DiaChi = new DiaChi();
        model.addAttribute("update", DiaChi);

        Optional<DiaChi> diaChi = DiaChiSevice.detail(id);
        model.addAttribute("getOne", diaChi.get());

        return "Update-DiaChi";
    }

    @PostMapping("update")
    public DiaChi update(@RequestBody DiaChi DiaChi) {
        return DiaChiSevice.update(DiaChi);
    }
}
