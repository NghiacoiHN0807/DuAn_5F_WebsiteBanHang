package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.services.SanPhamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
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
@RequestMapping("/san-pham/api/")
@CrossOrigin("http://localhost:3000/")
public class SanPhamController {


    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping("views")
    Page<SanPham> getALl(@RequestParam(value = "page", defaultValue = "0") Integer page,
                         @RequestParam(value = "limit", defaultValue = "5") Integer limit,
                         @RequestParam(value = "total", defaultValue = "0") Integer total
                         ) {
        return sanPhamService.getAll(page, limit, total);
    }

}
