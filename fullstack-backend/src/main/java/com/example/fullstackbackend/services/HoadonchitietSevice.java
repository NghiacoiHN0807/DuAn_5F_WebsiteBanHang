package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface HoadonchitietSevice {
    List<HoaDonChiTiet> getAll();

    Page<HoaDonChiTiet> chatlieuPage(Integer pageNo, Integer size);

    List<Object[]> getListProductOncart(Integer idHd);

    HoaDonChiTiet add(HoaDonChiTiet add);

    void delete(Integer id);

    Boolean checkExists(Integer id);

    HoaDonChiTiet update(HoaDonChiTiet update);

    LichSuHoaDon addLS(HoaDonChiTiet addLS,int status);

    Optional<HoaDonChiTiet> detail(Integer id);

    List<HoaDonChiTiet> getOne(Integer idHd);

    HoaDonChiTiet updateCart(ChiTietSanPham idCTSP, Integer soLuong, BigDecimal donGia, Integer idHD);
}