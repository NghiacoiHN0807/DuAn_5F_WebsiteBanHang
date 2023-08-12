package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.TaiKhoanKhachHang;
import com.example.fullstackbackend.entity.TaiKhoanNhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaiKhoanKhachHangRepository extends JpaRepository<TaiKhoanKhachHang, Integer> {
    @Query("SELECT g FROM TaiKhoanNhanVien g WHERE g.idChucVu.idCv = 9")
    Page<TaiKhoanNhanVien> findAllKhachHang(Pageable pageable);
}