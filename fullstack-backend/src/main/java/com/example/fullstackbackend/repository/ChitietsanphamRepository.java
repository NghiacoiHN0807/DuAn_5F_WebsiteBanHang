package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository

public interface ChitietsanphamRepository extends JpaRepository<ChiTietSanPham, Integer> {
    @Query("SELECT x FROM ChiTietSanPham x WHERE x.idSp.tenSp = :tenSp")
    List<ChiTietSanPham> findByProductName(@Param("tenSp") String tenSp);

    @Query("SELECT x FROM ChiTietSanPham x WHERE x.idSp.idSp = ?1")
    List<ChiTietSanPham> findByIdSp(Integer idSp);

    @Query("SELECT c FROM ChiTietSanPham c WHERE c.idSp.idSp = :idSp")
    List<ChiTietSanPham> findByProductId(@Param("idSp") Integer idSp);

//    ChiTietSanPham findByIdSp_IdSp(Integer idSp);
}