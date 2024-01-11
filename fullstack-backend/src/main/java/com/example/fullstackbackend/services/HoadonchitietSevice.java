package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface HoadonchitietSevice {
    List<HoaDonChiTiet> getAll();

    List<HoaDonChiTiet> chatlieuPage();

    List<Object[]> getListProductOncart(Integer idHd);

    List<Object[]> getListProductOncart2(Integer idHd);
    List<Object[]> getListProductOncart3(Integer idHd);

    Page<HoaDonChiTiet> getListProductByIDKH(Integer idKH, Integer pageNo, Integer size);

    ResponseEntity<?> add(HoaDonChiTiet add);

    HoaDonChiTiet add1(HoaDonChiTiet add);

    void delete(Integer id);

    Boolean checkExists(Integer id);

    ResponseEntity<?> update(HoaDonChiTiet update);

    ResponseEntity<?> returnItem(HoaDonChiTiet update, Integer status);

    LichSuHoaDon addLS(HoaDonChiTiet addLS, int status);

    Optional<HoaDonChiTiet> detail(Integer id);

    List<HoaDonChiTiet> getOne(Integer idHd);

    List<HoaDonChiTiet> findAllByIDHD(Integer idHd);

    HoaDonChiTiet updateCart(ChiTietSanPham idCTSP, Integer soLuong, BigDecimal donGia, Integer idHD);
}