package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.services.LoaispSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/loai-sp/api/")
@CrossOrigin("http://localhost:3000/")
public class LoaiSpController {
    @Autowired
    private LoaispSevice loaispSevice;

    @GetMapping("views")
    Page<LoaiSp> getAll(@RequestParam(value = "page", defaultValue = "0") Integer pageNo, @RequestParam(value = "size", defaultValue = "5") Integer size, @RequestParam(value = "trangThai", defaultValue = "0") Integer trangThai) {
        return loaispSevice.chatlieuPage(pageNo, size, trangThai);
    }
}
