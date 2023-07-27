package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.LichSuGiamGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LichSuGiamGiaRepository extends JpaRepository<LichSuGiamGia, Integer> {


}
