package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository

public interface ChitietsanphamRepository extends JpaRepository<ChiTietSanPham, Integer> {

    @Query("SELECT g FROM ChiTietSanPham g WHERE g.trangThai = :trangThai")
    Page<ChiTietSanPham> findAllByTrangThai(@Param("trangThai") Integer trangThai, Pageable pageable);

}