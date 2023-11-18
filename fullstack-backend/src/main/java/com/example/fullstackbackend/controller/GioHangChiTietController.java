package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.GioHangChiTiet;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.GioHangChiTietSevice;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/gio-hang-chi-tiet/")
@CrossOrigin("http://localhost:3000/")
public class GioHangChiTietController {
    @Autowired
    private GioHangChiTietSevice gioHangChiTietSevice;

    @GetMapping("view-all/{id}")
    public List<GioHangChiTiet> viewAll(@PathVariable("id") Integer id) {
        return gioHangChiTietSevice.getAll(id);
    }

    @PostMapping("add/{id}")
    public ResponseEntity<?> addGHCT(@Valid @RequestBody GioHangChiTiet updateGHCT, BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.ok("Không Được Để Trống");
        }else {
            gioHangChiTietSevice.addGHCT( updateGHCT);
            return ResponseEntity.ok("Update Thành Công");
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateGHCT(@PathVariable("id") Integer id, @Valid @RequestBody GioHangChiTiet updateGHCT, BindingResult result){
        if (result.hasErrors()) {
            return ResponseEntity.ok("Không Được Để Trống");
        }else {
            gioHangChiTietSevice.updateGHCT(id, updateGHCT);
            return ResponseEntity.ok("Update Thành Công");
        }
    }

}
