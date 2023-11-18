package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.GioHangChiTiet;
import com.example.fullstackbackend.repository.GioHangChiTietReponsitory;
import com.example.fullstackbackend.services.GioHangChiTietSevice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GioHangChiTietServiceImpl implements GioHangChiTietSevice {

    private final GioHangChiTietReponsitory gioHangChiTietReponsitory;

    @Override
    public List<GioHangChiTiet> getAll(Integer idKh) {
        return gioHangChiTietReponsitory.findByIdGh_IdKh_IdTaiKhoan(idKh);
    }

    @Override
    public ResponseEntity<?> addGHCT(GioHangChiTiet gioHangChiTiet) {
        gioHangChiTietReponsitory.save(gioHangChiTiet);
        return ResponseEntity.ok("Thêm Thành Công");
    }

    @Override
    public ResponseEntity<?> updateGHCT(Integer id, GioHangChiTiet gioHangChiTiet) {
        Optional<GioHangChiTiet> detailGHCT = gioHangChiTietReponsitory.findById(id);
        if (detailGHCT.isEmpty()) {
            return ResponseEntity.ok("Cập Nhập Không Thành Công");
        }else {
        gioHangChiTietReponsitory.save(gioHangChiTiet);
        return ResponseEntity.ok("Cập Nhập Thành Công");
        }
    }
}