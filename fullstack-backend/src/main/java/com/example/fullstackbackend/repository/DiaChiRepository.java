package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.DiaChi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DiaChiRepository extends JpaRepository<DiaChi, Integer> {
    @Query("select d from DiaChi d where d.maTaiKhoanKhachHang.maTaiKhoan = ?1")
    Page<DiaChi> findByMaTaiKhoan_MaTaiKhoan(String maTaiKhoan, Pageable pageable);



}