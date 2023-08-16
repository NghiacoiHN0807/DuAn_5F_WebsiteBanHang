package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LichSuHoaDonRepository extends JpaRepository<LichSuHoaDon, Integer> {
    @Query(value = "SELECT c FROM LichSuHoaDon c WHERE c.idHd.idHd = ?1")
    List<LichSuHoaDon> finByIdHd(Integer idHd);
}