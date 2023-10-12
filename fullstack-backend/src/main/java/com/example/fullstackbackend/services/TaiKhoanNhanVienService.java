package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.TaiKhoan;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanNhanVienService {
    List<TaiKhoan> getAll();

    Page<TaiKhoan> phanTrang(Integer pageNo, Integer size);

    Page<TaiKhoan> phanTrang(Integer pageNo, Integer size, Integer trangThai);

    TaiKhoan add(TaiKhoan taiKhoan);

    Optional<TaiKhoan> getOne(Integer id);

    TaiKhoan delete(Integer id);

    TaiKhoan update(TaiKhoan taiKhoan, Integer id);

    Boolean existsById(Integer id);

    Optional<TaiKhoan> detail(Integer id);

    Page<TaiKhoan> chucVu(Integer pageNo, Integer size);
}
