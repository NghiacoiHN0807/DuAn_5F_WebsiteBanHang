package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.DiaChi;
import com.example.fullstackbackend.exception.DiaChiNotFoundException;
import com.example.fullstackbackend.services.DiaChiSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/dia-chi/")
@CrossOrigin("http://localhost:3000/")
public class DiaChiController {
    @Autowired
    private DiaChiSevice diaChiSevice;

    @GetMapping("/view-all/{maTaiKhoan}/")
    public Page<DiaChi> viewAll(@PathVariable("maTaiKhoan") String maTaiKhoan,
                                @RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "5") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        return diaChiSevice.getAll(maTaiKhoan, p.orElse(page), size);
    }

    @PostMapping("add")
    public DiaChi add(@Valid @RequestBody DiaChi DiaChi,
                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return diaChiSevice.add(DiaChi);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<DiaChi> detail(@PathVariable("id") Integer id) {
        return diaChiSevice.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!diaChiSevice.checkExists(id)) {
            throw new DiaChiNotFoundException(id);
        } else {
            diaChiSevice.delete(id);
            return "";
        }
    }


    @PostMapping("update")
    public DiaChi update(@RequestBody DiaChi DiaChi) {
        return diaChiSevice.update(DiaChi);
    }
}
