package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.HinhThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository

public interface HinhThucThanhToanRepository extends JpaRepository<HinhThucThanhToan, Integer> {

}