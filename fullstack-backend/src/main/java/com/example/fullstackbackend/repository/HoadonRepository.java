package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.HoaDon;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
=======
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
>>>>>>> main


@Repository

public interface HoadonRepository extends JpaRepository<HoaDon, Integer> {
<<<<<<< HEAD

=======
    @Query(value = "SELECT x from HoaDon x where x.maHd = ?1")
    HoaDon findByMaHd(Integer maHD);

    @Query(value = "SELECT x from HoaDon x where x.trangThai = 8 or x.trangThai = 9")
    Page<HoaDon> pageOfflineInvoice(Pageable pageable);

    @Query(value = "SELECT x from HoaDon x where x.trangThai = 8")
    List<HoaDon> selectAllInvoiceWaiting();

    @Query(value = "SELECT x from HoaDon x where x.trangThai = 1 or x.trangThai = 2 or x.trangThai = 3 or x.trangThai = 4 " +
            "or x.trangThai = 5 or x.trangThai = 8 or x.trangThai = 9 or x.trangThai = 10 or x.trangThai = 0 ORDER BY x.ngayTao DESC")
    Page<HoaDon> pageOnlineInvoice(Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "UPDATE HoaDon hd SET hd.trangThai= 10 WHERE hd.idHd=?1")
    void delete(Integer idHD);
>>>>>>> main
}