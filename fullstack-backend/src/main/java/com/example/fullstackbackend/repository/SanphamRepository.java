package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface SanphamRepository extends JpaRepository<SanPham, Integer> {

    @Query("SELECT s FROM SanPham s WHERE s.tinhTrang = :tinhTrang")
    Page<SanPham> findAllByTinhTrang(@Param("tinhTrang") Integer tinhTrang, Pageable pageable);

}