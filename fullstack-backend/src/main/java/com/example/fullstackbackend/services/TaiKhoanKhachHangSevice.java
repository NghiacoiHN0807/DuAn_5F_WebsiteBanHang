package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.TaiKhoanKhachHang;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanKhachHangSevice {

    List<TaiKhoanKhachHang> getAll();

    Page<TaiKhoanKhachHang> Page(Integer pageNo, Integer size);

    TaiKhoanKhachHang add(TaiKhoanKhachHang add);

    void delete(Integer id);

    Boolean checkExists(Integer id);

    TaiKhoanKhachHang update(TaiKhoanKhachHang update);

    Optional<TaiKhoanKhachHang> detail(Integer id);
}
