package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.GiamGia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiamGiaRepository extends JpaRepository<GiamGia, Integer> {
    List<GiamGia> findByMaGiamGia(String ma);

    @Query("SELECT g FROM GiamGia g WHERE g.trangThai = :trangThai")
    Page<GiamGia> findAllByTrangThai(@Param("trangThai") Integer trangThai, Pageable pageable);





}
