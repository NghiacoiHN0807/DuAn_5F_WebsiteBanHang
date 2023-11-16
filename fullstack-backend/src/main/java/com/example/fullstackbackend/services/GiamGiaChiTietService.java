package com.example.fullstackbackend.services;

import com.example.fullstackbackend.DTO.GiamGiaDTO;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GiamGia;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface GiamGiaChiTietService {

    List<GiamGiaChiTiet> getAll();

    List<GiamGiaChiTiet> getAllByTrangThai(Integer trangThai);

//    Page<GiamGiaChiTiet> search(Integer pageNo, Integer size, String value);

    List<GiamGiaChiTiet> getAllByDate(LocalDate ngayBatDau, LocalDate ngayKetThuc);

    Optional<GiamGiaChiTiet> getOne(Integer id);

    GiamGiaChiTiet add(GiamGiaChiTiet giamGiaChiTiet);

    Object update(GiamGiaChiTiet giamGiaChiTiet, Integer id);

    Boolean existsById(Integer id);

    void remove(Integer id);

    void updateGiaThuc(Integer id);

    String typeGiam(Integer idSp);

    BigDecimal mucGiam(Integer idSp);

    GiamGia insert(GiamGiaDTO giamGiaDTO);

    GiamGia updateDto(GiamGiaDTO giamGiaDTO, Integer id);

}