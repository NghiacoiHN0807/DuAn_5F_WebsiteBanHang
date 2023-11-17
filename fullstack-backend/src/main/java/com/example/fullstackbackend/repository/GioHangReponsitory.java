package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GioHangReponsitory extends JpaRepository<GioHang, Integer> {
}
