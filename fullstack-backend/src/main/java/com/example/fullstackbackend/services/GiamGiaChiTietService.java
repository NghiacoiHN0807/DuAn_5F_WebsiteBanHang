package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.Optional;

public interface GiamGiaChiTietService {

    Page<GiamGiaChiTiet> getAll(Integer pageNo, Integer size);

    Page<GiamGiaChiTiet> getAllByTrangThai(Integer pageNo, Integer size, Integer trangThai);

    Page<GiamGiaChiTiet> search(Integer pageNo, Integer size, String value);

    Page<GiamGiaChiTiet> getAllByDate(Integer pageNo, Integer size, LocalDate ngayBatDau, LocalDate ngayKetThuc);

    Optional<GiamGiaChiTiet> getOne(Integer id);

    GiamGiaChiTiet add(GiamGiaChiTiet giamGiaChiTiet);

    Object update(GiamGiaChiTiet giamGiaChiTiet, Integer id);

    Boolean existsById(Integer id);

    void remove(Integer id);

    Integer findByIdGiamGia_IdGiamGia(Integer id);

}
