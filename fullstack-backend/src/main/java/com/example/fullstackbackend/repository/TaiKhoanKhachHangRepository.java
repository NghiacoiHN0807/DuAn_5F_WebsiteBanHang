package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.TaiKhoanKhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaiKhoanKhachHangRepository extends JpaRepository<TaiKhoanKhachHang, Integer> {

    @Query("select t from TaiKhoanKhachHang t order by t.idTaiKhoan DESC ")
    @Override
    Page<TaiKhoanKhachHang> findAll(Pageable pageable);
}