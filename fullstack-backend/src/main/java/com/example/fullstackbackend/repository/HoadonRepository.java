package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository

public interface HoadonRepository extends JpaRepository<HoaDon, Integer> {
    @Query(value = "SELECT x from HoaDon x where x.maHd = ?1")
    HoaDon findByMaHd(Integer maHD);

    @Query(value = "SELECT x from HoaDon x where x.trangThai = 8 or x.trangThai = 9")
    List<HoaDon> pageOfflineInvoice();

    @Query(value = "SELECT x from HoaDon x where x.trangThai = 8 ORDER BY x.maHd DESC")
    List<HoaDon> selectAllInvoiceWaiting();

    @Query(value = "SELECT x from HoaDon x where x.trangThai = 1 or x.trangThai = 2 or x.trangThai = 3 or x.trangThai = 4 " +
            "or x.trangThai = 5 or x.trangThai = 8 or x.trangThai = 9 or x.trangThai = 10 or x.trangThai = 0 ORDER BY x.maHd DESC")
    List<HoaDon> pageOnlineInvoice();

    @Modifying
    @Transactional
    @Query(value = "UPDATE HoaDon hd SET hd.trangThai= 10 WHERE hd.idHd=?1")
    void delete(Integer idHD);

    // Select all data of bill
//    List<HoaDon> findAllByOrdOrderByMaHdDesc();
}