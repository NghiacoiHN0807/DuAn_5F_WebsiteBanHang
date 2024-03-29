package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GioHangChiTiet;

import java.util.List;
import java.util.Optional;

public interface GioHangChiTietSevice {
    List<GioHangChiTiet> getAll(Integer idKh);

    Optional<GioHangChiTiet> detail(Integer id);

    GioHangChiTiet update(GioHangChiTiet update);

    void addGHCT(Integer idKH, GioHangChiTiet gioHangChiTiet);

    void updateGHCT(Integer id, Integer idGH,GioHangChiTiet gioHangChiTiet);

    void deleteGHCT(Integer idGHCT);

    Optional<GioHangChiTiet> finByIDCTSP(Integer idCtsp, Integer idGH);

    void transferHDCT(Integer idHd, ChiTietSanPham chiTietSanPham);

}