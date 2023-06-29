package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository

public interface ChitietsanphamRepository extends JpaRepository<ChiTietSanPham, Integer> {

}