package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.GioHangChiTiet;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GioHangChiTietSevice {
    List<GioHangChiTiet> getAll(Integer idKh);

    ResponseEntity<?> addGHCT(GioHangChiTiet gioHangChiTiet);

    ResponseEntity<?> updateGHCT(Integer id, GioHangChiTiet gioHangChiTiet);

}