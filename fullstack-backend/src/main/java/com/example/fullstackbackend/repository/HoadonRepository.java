package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository

public interface HoadonRepository extends JpaRepository<HoaDon, Integer> {
    @Query(value = "SELECT x from HoaDon x where x.maHd = ?1")
    HoaDon findByMaHd(Integer maHD);
}