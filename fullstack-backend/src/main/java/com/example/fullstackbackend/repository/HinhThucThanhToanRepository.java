package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.HinhThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository

public interface HinhThucThanhToanRepository extends JpaRepository<HinhThucThanhToan, Integer> {
    @Query(value = "SELECT x FROM HinhThucThanhToan x WHERE x.idHd.idHd = ?1")
    List<HinhThucThanhToan> selectByIdHd(Integer idHd);
}