package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaiKhoanKhachHangRepository extends JpaRepository<TaiKhoan, Integer> {

    @Query("select t from TaiKhoan t order by t.idTaiKhoan DESC ")
    @Override
    Page<TaiKhoan> findAll(Pageable pageable);
}