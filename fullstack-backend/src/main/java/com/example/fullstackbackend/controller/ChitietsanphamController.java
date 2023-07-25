package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.entity.MauSac;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.entity.XuatXu;
import com.example.fullstackbackend.services.ChitietsanphamSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chi-tiet-san-pham/api/")
public class ChitietsanphamController {
    @Autowired
    private ChitietsanphamSevice chitietsanphamSevice;

    @GetMapping("views")
    Page<ChiTietSanPham> getAll(@RequestParam(value = "page", defaultValue = "0") Integer pageNo, @RequestParam(value = "size", defaultValue = "5") Integer size, @RequestParam(value = "trangThai", defaultValue = "0") Integer trangThai){
        return chitietsanphamSevice.chatlieuPage(pageNo, size, trangThai);
    }

}
