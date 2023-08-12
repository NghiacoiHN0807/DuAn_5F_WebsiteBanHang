package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.SanPhamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/san-pham/")
public class SanPhamController {
    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping("view-all")
    public Page<SanPham> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                  @RequestParam(defaultValue = "15") Integer size,
                                  @RequestParam("p") Optional<Integer> p) {
        return sanPhamService.sanPhamPage(p.orElse(page), size);
    }

    @GetMapping("listSP")
    public List<SanPham> listSP() {
        return sanPhamService.getAll();
    }

    @PostMapping("add")
    public SanPham add(@Valid @RequestBody SanPham sanPham,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return sanPhamService.add(sanPham);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<SanPham> detail(@PathVariable("id") Integer id) {
        return sanPhamService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public SanPham delete(@PathVariable("id") Integer id) {
        return sanPhamService.delete(id);
    }

    @PutMapping("update")
    public SanPham update(@RequestBody SanPham sanPham) {
        return sanPhamService.update(sanPham);
    }
}
