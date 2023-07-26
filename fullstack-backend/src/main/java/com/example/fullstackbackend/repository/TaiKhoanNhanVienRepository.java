package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.TaiKhoanNhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface TaiKhoanNhanVienRepository extends JpaRepository<TaiKhoanNhanVien, Integer> {
    @Query("SELECT g FROM TaiKhoanNhanVien g WHERE g.trangThai = :trangThai")
    Page<TaiKhoanNhanVien> findAllByTrangThai(@Param("trangThai") Integer trangThai, Pageable pageable);
}
