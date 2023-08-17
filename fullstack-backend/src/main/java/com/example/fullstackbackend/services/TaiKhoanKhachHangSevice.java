package com.example.fullstackbackend.services;

<<<<<<< HEAD
import com.example.fullstackbackend.entity.TaiKhoanKhachHang;
import com.example.fullstackbackend.entity.TaiKhoanNhanVien;
=======
import com.example.fullstackbackend.entity.TaiKhoan;
>>>>>>> origin/phuclt
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanKhachHangSevice {

    List<TaiKhoan> getAll();

    Page<TaiKhoan> Page(Integer pageNo, Integer size);

<<<<<<< HEAD
    Page<TaiKhoanNhanVien> PageKhachHang(Integer pageNo, Integer size);

    TaiKhoanKhachHang add(TaiKhoanKhachHang add);
=======
    TaiKhoan add(TaiKhoan add);
>>>>>>> origin/phuclt

    void delete(Integer id);

    Boolean checkExists(Integer id);

    TaiKhoan update(TaiKhoan update);

    Optional<TaiKhoan> detail(String idOrMa);
}
