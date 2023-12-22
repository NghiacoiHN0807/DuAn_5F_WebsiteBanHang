package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GioHangChiTietReponsitory extends JpaRepository<GioHangChiTiet, Integer> {


    List<GioHangChiTiet> findByIdGh_IdKh_IdTaiKhoan(Integer idTK);

//    List<GioHangChiTiet> findAllById


    @Query(value = "SELECT c FROM GioHangChiTiet c WHERE c.idCtsp.idCtsp =?1 AND c.idGh.idGioHang=?2")
    Optional<GioHangChiTiet> findByIdCtsp_IdCtsp(Integer idCTSP, Integer idGH);

//    @Query(value = "SELECT c FROM GioHangChiTiet c WHERE c.idCtsp.idCtsp =?1")
//    Optional<GioHangChiTiet> findByIdCtsp_IdCtsp2(Integer idCTSP);
}
