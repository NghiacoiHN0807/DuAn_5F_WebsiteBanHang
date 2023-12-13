package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.TaiKhoan;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanNhanVienService {
    List<TaiKhoan> getAll();

    List<TaiKhoan> chucVu();

    TaiKhoan add(TaiKhoan taiKhoan);

    Optional<TaiKhoan> getOne(Integer id);

    Boolean delete(Integer id, Integer trangThai);

    Boolean deleteAll(List<Integer> id);

    TaiKhoan update(TaiKhoan taiKhoan, Integer id);

    Boolean existsById(Integer id);

    Optional<TaiKhoan> detail(Integer id);


}
