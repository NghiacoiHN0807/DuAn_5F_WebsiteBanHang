package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.TaiKhoanKhachHang;
import com.example.fullstackbackend.entity.TaiKhoanNhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.fullstackbackend.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface TaiKhoanKhachHangRepository extends JpaRepository<TaiKhoan, Integer> {
    @Query("select t from TaiKhoan t where t.idChucVu.idCv = 9  and t.trangThai between 0 and 4 order by t.idTaiKhoan DESC ")
    @Override
    Page<TaiKhoan> findAll(Pageable pageable);

    @Query("SELECT g FROM TaiKhoanNhanVien g WHERE g.idChucVu.idCv = 9")
    Page<TaiKhoan> findAllKhachHang(Pageable pageable);

    @Query("select t from TaiKhoan t where  t.maTaiKhoan = ?1 order by t.idTaiKhoan DESC")
    Optional<TaiKhoan> findByMaTaiKhoanOrderByIdTaiKhoanDesc(String maTaiKhoan);

    @Transactional
    @Modifying
    @Query("update TaiKhoan t set t.trangThai = 10 where t.idTaiKhoan = ?1")
    void XoaMem(Integer idTaiKhoan);
}