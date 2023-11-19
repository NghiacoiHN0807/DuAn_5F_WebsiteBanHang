package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.HinhThucThanhToan;
import com.example.fullstackbackend.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository

public interface HinhThucThanhToanRepository extends JpaRepository<HinhThucThanhToan, Integer> {
    @Query(value = "SELECT x from HinhThucThanhToan x where x.idHd.idHd = ?1")
    List<HinhThucThanhToan> findByIdHd(Integer maHD);
}