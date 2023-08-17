package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface GiamGiaChiTietRepository extends JpaRepository<GiamGiaChiTiet, Integer> {

    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.trangThai = :trangThai")
    Page<GiamGiaChiTiet> findAllByTrangThai(@Param("trangThai") Integer trangThai, Pageable pageable);

    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.idGiamGia.tenChuongTrinh = :value " +
            "OR g.idCtsp.idSp.tenSp = :value " +
            "OR g.donGia = :value " +
            "OR g.soTienConLai = :value ")
    Page<GiamGiaChiTiet> findAllByValue(@Param("value") String value, Pageable pageable);

    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.idGiamGia.ngayBatDau = :ngayBatDau AND g.idGiamGia.ngayKetThuc = :ngayKetThuc")
    Page<GiamGiaChiTiet> findAllByDate(@Param("ngayBatDau") LocalDate ngayBatDau, @Param("ngayKetThuc") LocalDate ngayKetThuc, Pageable pageable);

    @Query("SELECT g.idGiamGia.idGiamGia FROM GiamGiaChiTiet g WHERE g.idGgct = :id")
    Integer findByIdGiamGia_IdGiamGia(@Param("id") Integer id);
}
