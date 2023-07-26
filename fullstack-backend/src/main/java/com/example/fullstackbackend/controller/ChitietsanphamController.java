package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.services.ChitietsanphamSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/chi-tiet-san-pham/")
public class ChitietsanphamController {
    @Autowired
    private ChitietsanphamSevice chitietsanphamSevice;

    @GetMapping("view-all")
    public Page<ChiTietSanPham> viewAll(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size, @RequestParam("p") Optional<Integer> p) {
        Page<ChiTietSanPham> ChiTietSanPhams = chitietsanphamSevice.chiTietSanPhamPage(p.orElse(page), size);
        return ChiTietSanPhams;
    }

    @GetMapping("select-Classify/{name}")
    public List<ChiTietSanPham> findByProductName(@PathVariable("name") String name) {
        List<ChiTietSanPham> chiTietSanPham = chitietsanphamSevice.findByProductName(name);
        return chiTietSanPham;
    }

    @PostMapping("add")
    public ChiTietSanPham add(@Valid @RequestBody ChiTietSanPham newHD, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return chitietsanphamSevice.add(newHD);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<ChiTietSanPham> detail(@PathVariable("id") Integer id) {
        Optional<ChiTietSanPham> findHDCT = chitietsanphamSevice.detail(id);
        return findHDCT;
    }

    @PutMapping("update/{id}")
    public ChiTietSanPham update(@RequestParam ChiTietSanPham newHD, @PathVariable("id") Integer id) {
        return chitietsanphamSevice.update(newHD);
    }

//    @DeleteMapping("delete/{id}")
//    public String delete(@PathVariable("id") Integer id) {
//            chitietsanphamSevice.delete(id);
//            return "";
//    }
}
