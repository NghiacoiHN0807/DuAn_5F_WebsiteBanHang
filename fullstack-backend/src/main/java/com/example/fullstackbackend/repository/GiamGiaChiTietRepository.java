package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GiamGiaChiTietRepository extends JpaRepository<GiamGiaChiTiet, Integer> {

    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.trangThai = :trangThai")
    Page<GiamGiaChiTiet> findAllByTrangThai(@Param("trangThai") Integer trangThai, Pageable pageable);
}
