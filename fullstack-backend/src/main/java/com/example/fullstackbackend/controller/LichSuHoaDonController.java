package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.DTO.LichSuHoaDonDTO;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.entity.XuatXu;
import com.example.fullstackbackend.services.LichSuHoaDonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/lich-su-hoa-don/")
@CrossOrigin("http://localhost:3000/")
public class LichSuHoaDonController {
    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;

    @GetMapping("view-all/{id}")
    public List<LichSuHoaDonDTO> viewAll(@PathVariable("id") Integer id) {
        return lichSuHoaDonService.getAll(id);
    }

    @PostMapping("add")
    public LichSuHoaDon add(@Valid @RequestBody LichSuHoaDon lichSuHoaDon,
                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return lichSuHoaDonService.add(lichSuHoaDon);
        }
    }
}

