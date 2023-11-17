package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GioHangChiTietReponsitory extends JpaRepository<GioHangChiTiet, Integer> {

    List<GioHangChiTiet> findByIdGh_IdKh_IdTaiKhoan(Integer idTK);
}