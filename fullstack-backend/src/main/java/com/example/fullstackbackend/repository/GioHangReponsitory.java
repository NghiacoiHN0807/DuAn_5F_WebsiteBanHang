package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GioHangReponsitory extends JpaRepository<GioHang, Integer> {

    Optional<GioHang> findByIdKh_IdTaiKhoan(Integer idTK);
}
