package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository

public interface HoadonchitietRepository extends JpaRepository<HoaDonChiTiet, Integer> {

}