package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.HinhThucThanhToan;
import com.example.fullstackbackend.services.HinhThucThanhToanSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hinh-thuc-thanh-toan/")
@CrossOrigin("http://localhost:3000/")
public class HinhThucThanhToanController {
    @Autowired
    private HinhThucThanhToanSevice HinhThucThanhToanSevice;

    @GetMapping("view-all-pages")
    public List<HinhThucThanhToan> viewAll() {
        List<HinhThucThanhToan> HinhThucThanhToans = HinhThucThanhToanSevice.getAll();
        return HinhThucThanhToans;
    }

    @GetMapping("view-all-list/{id}")
    public List<HinhThucThanhToan> viewAllList(@PathVariable("id") Integer id) {
        List<HinhThucThanhToan> HinhThucThanhToans = HinhThucThanhToanSevice.detail(id);
        return HinhThucThanhToans;
    }

    @PostMapping("add")
    public HinhThucThanhToan add(@Valid @RequestBody HinhThucThanhToan newHTTT,
                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return HinhThucThanhToanSevice.add(newHTTT);
        }
    }


}
