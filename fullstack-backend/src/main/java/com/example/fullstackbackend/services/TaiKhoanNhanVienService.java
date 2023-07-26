package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.TaiKhoanNhanVien;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanNhanVienService {
    List<TaiKhoanNhanVien> getAll();

    Page<TaiKhoanNhanVien> phanTrang(Integer pageNo, Integer size);

    Page<TaiKhoanNhanVien> phanTrang(Integer pageNo, Integer size, Integer trangThai);

    TaiKhoanNhanVien add(TaiKhoanNhanVien taiKhoanNhanVien);

    void delete(Integer id);

    TaiKhoanNhanVien update(TaiKhoanNhanVien taiKhoanNhanVien);
    Boolean existsById(Integer id);

    Optional<TaiKhoanNhanVien> detail(Integer id);


}
