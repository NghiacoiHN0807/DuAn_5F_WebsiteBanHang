package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface TaiKhoanNhanVienRepository extends JpaRepository<TaiKhoan, Integer> {
    @Query("SELECT g FROM TaiKhoan g WHERE g.trangThai = :trangThai")
    Page<TaiKhoan> findAllByTrangThai(@Param("trangThai") Integer trangThai, Pageable pageable);

    @Query("SELECT g FROM TaiKhoan g WHERE g.idChucVu.idCv = 1 or g.idChucVu.idCv = 2")
    Page<TaiKhoan> chucVu( Pageable pageable);


}
