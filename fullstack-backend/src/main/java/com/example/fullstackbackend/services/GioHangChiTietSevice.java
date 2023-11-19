package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GioHangChiTiet;

import java.util.List;

public interface GioHangChiTietSevice {
    List<GioHangChiTiet> getAll(Integer idKh);

    void addGHCT(Integer idKH, GioHangChiTiet gioHangChiTiet);

    void updateGHCT(Integer id, GioHangChiTiet gioHangChiTiet);

    void deleteGHCT(Integer idGHCT);

    void transferHDCT(Integer idHd, ChiTietSanPham chiTietSanPham);

}