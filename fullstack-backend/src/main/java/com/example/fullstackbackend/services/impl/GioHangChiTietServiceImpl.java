package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.GioHangChiTiet;
import com.example.fullstackbackend.repository.GioHangChiTietReponsitory;
import com.example.fullstackbackend.services.GioHangChiTietSevice;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GioHangChiTietServiceImpl implements GioHangChiTietSevice {

    private final GioHangChiTietReponsitory gioHangChiTietReponsitory;

    @Override
    public List<GioHangChiTiet> getAll(Integer idKh) {
        return gioHangChiTietReponsitory.findByIdGh_IdKh_IdTaiKhoan(idKh);
    }
}