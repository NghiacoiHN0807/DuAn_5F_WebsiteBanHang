package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.GiamGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiamGiaRepository extends JpaRepository<GiamGia, Integer> {
    List<GiamGia> findByMaGiamGia(String ma);
}
