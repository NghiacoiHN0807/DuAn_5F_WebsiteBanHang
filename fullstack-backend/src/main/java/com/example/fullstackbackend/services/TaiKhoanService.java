package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChucVu;
import com.example.fullstackbackend.entity.TaiKhoan;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanService {
    List<TaiKhoan> getAll();

    Page<TaiKhoan> phanTrang(Integer pageNo, Integer size);

    void add(TaiKhoan taiKhoan);

    void delete(Integer id);

    void update(TaiKhoan taiKhoan);

    Optional<TaiKhoan> detail(Integer id);
}
