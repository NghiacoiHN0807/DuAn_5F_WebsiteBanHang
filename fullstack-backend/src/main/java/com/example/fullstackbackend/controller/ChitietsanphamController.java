package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.LoaiCoAo;
import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.entity.MauSac;
import com.example.fullstackbackend.entity.OngTayAo;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.entity.XuatXu;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.ChatlieuService;
import com.example.fullstackbackend.services.ChitietsanphamService;
import com.example.fullstackbackend.services.LoaiCoAoService;
import com.example.fullstackbackend.services.LoaispService;
import com.example.fullstackbackend.services.MausacService;
import com.example.fullstackbackend.services.OngTayAoService;
import com.example.fullstackbackend.services.SanPhamService;
import com.example.fullstackbackend.services.SizeService;
import com.example.fullstackbackend.services.XuatxuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
@RequestMapping("/chi-tiet-san-pham/")
@CrossOrigin("http://localhost:3000/")

public class ChitietsanphamController {
    @Autowired
    private ChitietsanphamService chitietsanphamSevice;

    @GetMapping("view-all")
    public Page<ChiTietSanPham> viewAll(@RequestParam(defaultValue = "0") Integer page,
                          @RequestParam(defaultValue = "5") Integer size,
                          @RequestParam("p") Optional<Integer> p) {
        Page<ChiTietSanPham> chiTietSP = chitietsanphamSevice.chiTietSP(p.orElse(page), size);
        return chiTietSP;
    }

    @GetMapping("select-Classify/{name}")
    public List<ChiTietSanPham> findByProductName(@PathVariable("name") String name) {
        List<ChiTietSanPham> chiTietSanPham = chitietsanphamSevice.findByProductName(name);
        return chiTietSanPham;
    }

    @PostMapping("add")
    public ChiTietSanPham add(@Valid @RequestBody ChiTietSanPham chiTietSanPham,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return chitietsanphamSevice.add(chiTietSanPham);
        }
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!chitietsanphamSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            chitietsanphamSevice.delete(id);
            return "";
        }
    }

    @PutMapping("update")
    public ChiTietSanPham update(@RequestBody ChiTietSanPham chiTietSanPham) {
        return chitietsanphamSevice.update(chiTietSanPham);
    }
}
