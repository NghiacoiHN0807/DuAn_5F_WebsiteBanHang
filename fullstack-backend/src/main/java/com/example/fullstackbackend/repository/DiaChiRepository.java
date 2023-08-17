package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.DiaChi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DiaChiRepository extends JpaRepository<DiaChi, Integer> {
    @Query("select d from DiaChi d where d.taiKhoan.maTaiKhoan = ?1 and d.trangThai between 0 and 4")
    Page<DiaChi> findByMaTaiKhoan_MaTaiKhoan(String maTaiKhoan, Pageable pageable);

    @Query("select count(d) from DiaChi d where d.taiKhoan.maTaiKhoan = ?1 and d.trangThai between 0 and 4")
    long CountTaiKhoan(String maTaiKhoan);

    @Transactional
    @Modifying
    @Query("update DiaChi d set d.trangThai = 10 where d.id = ?1")
    void XoaMem(Integer id);




}