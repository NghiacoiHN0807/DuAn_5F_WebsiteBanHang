package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.TaiKhoan;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanKhachHangSevice {

    List<TaiKhoan> getAll();

    Page<TaiKhoan> Page(Integer pageNo, Integer size);

    List<TaiKhoan> PageKhachHang();

    TaiKhoan add(TaiKhoan add);

    void delete(Integer id);

    Boolean checkExists(Integer id);

    TaiKhoan update(TaiKhoan update);

    Optional<TaiKhoan> detail(String idOrMa);
}
