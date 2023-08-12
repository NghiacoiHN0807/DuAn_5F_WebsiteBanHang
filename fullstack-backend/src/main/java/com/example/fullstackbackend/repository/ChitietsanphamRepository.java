package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


@Repository

public interface ChitietsanphamRepository extends JpaRepository<ChiTietSanPham, Integer> {
    @Query("SELECT x FROM ChiTietSanPham x WHERE x.idSp.tenSp = :tenSp")
    List<ChiTietSanPham> findByProductName(@Param("tenSp") String tenSp);

    @Query("SELECT x FROM ChiTietSanPham x WHERE x.idSp.idSp = ?1")
    List<ChiTietSanPham> findByIdSp(Integer idSp);

    @Query("SELECT c FROM ChiTietSanPham c WHERE c.idSp.idSp = :idSp")
    List<ChiTietSanPham> findByProductId(@Param("idSp") Integer idSp);

//    ChiTietSanPham findByIdSp_IdSp(Integer idSp);

    @Query(value = "SELECT sp.id_sp, sp.ma_sp, sp.ten_sp, sp.gia_ban\n" +
            "FROM duan_5f.chi_tiet_san_pham ct\n" +
            "JOIN duan_5f.san_pham sp ON ct.id_sp = sp.id_sp\n" +
            "JOIN duan_5f.size s ON ct.id_size = s.id_size\n" +
            "WHERE ct.trang_thai =0\n" +
            "GROUP BY sp.id_sp, sp.ma_sp, sp.ten_sp, sp.gia_ban\n" +
            "ORDER BY sp.ma_sp DESC", nativeQuery = true)
    Page<Object[]> getSanPhamWithSizes(Pageable pageable);

    @Query("SELECT x FROM ChiTietSanPham x WHERE x.idSp.tenSp = :tenSp AND x.idSize.tenSize = :tenSize")
    Optional<ChiTietSanPham> findByProductNameAndSize(@Param("tenSp") String tenSp, @Param("tenSize") String tenSize);

    @Query("SELECT x FROM ChiTietSanPham x WHERE x.idSp.idSp = ?1 and x.idSize.idSize = ?2")
    ChiTietSanPham checkExistSPandSize(Integer idSp, Integer idSize);

}