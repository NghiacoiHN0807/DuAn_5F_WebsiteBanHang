package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository

public interface ChitietsanphamRepository extends JpaRepository<ChiTietSanPham, Integer> {
    @Query("SELECT x FROM ChiTietSanPham x WHERE x.idSp.tenSp = :tenSp")
    List<ChiTietSanPham> findByProductName(@Param("tenSp") String tenSp);

    @Query(value = "SELECT\n" +
            "  id_ctsp, \n" +
            "  id_sp,\n" +
            "  id_size,\n" +
            "  id_ms,\n" +
            "  gia_nhap,\n" +
            "  gia_ban, \n" +
            "  gia_thuc_te,\n" +
            "  so_luong_ton,\n" +
            "  trang_thai\n" +
            "FROM chi_tiet_san_pham\n" +
            "WHERE id_sp = ?1 \n" +
            "ORDER BY id_ms, id_ctsp\n", nativeQuery = true)
    List<ChiTietSanPham> findByIdSp(@Param("idSp") Integer idSp);

    @Query("SELECT c FROM ChiTietSanPham c WHERE c.idSp.idSp = :idSp")
    List<ChiTietSanPham> findByProductId(@Param("idSp") Integer idSp);

//    ChiTietSanPham findByIdSp_IdSp(Integer idSp);

    @Query(value = "SELECT GROUP_CONCAT(DISTINCT img.images ORDER BY img.images ASC) AS img, sp.id_sp, sp.ma_sp, sp.ten_sp, GROUP_CONCAT(DISTINCT ct.gia_thuc_te ORDER BY ct.gia_thuc_te ASC) AS gia_thuc_te\n" +
            "            FROM duan_5f.chi_tiet_san_pham ct\n" +
            "            JOIN duan_5f.san_pham sp ON ct.id_sp = sp.id_sp\n" +
            "            JOIN duan_5f.images img ON img.id_sp = sp.id_sp\n" +
            "            WHERE ct.trang_thai =0\n" +
            "            GROUP BY sp.id_sp, sp.ma_sp, sp.ten_sp\n" +
            "            ORDER BY sp.ma_sp DESC", nativeQuery = true)
    List<Object[]> getSanPhamWithSizes();

    @Query("SELECT x FROM ChiTietSanPham x WHERE x.idSp.tenSp = :tenSp AND x.idSize.tenSize = :tenSize AND x.idMs.tenMs = :tenMs")
    Optional<ChiTietSanPham> findByProductNameAndSize(@Param("tenSp") String tenSp, @Param("tenSize") String tenSize, @Param("tenMs") String tenMs);

    @Query("SELECT x FROM ChiTietSanPham x WHERE x.idSp.idSp = ?1 and x.idSize.idSize = ?2")
    ChiTietSanPham checkExistSPandSize(Integer idSp, Integer idSize);

    @Query(value = "SELECT *\n" +
            "FROM chi_tiet_san_pham c \n" +
            "WHERE c.id_sp = :idSp AND c.id_ms = :idMs AND c.id_size = :idSize", nativeQuery = true)
    List<ChiTietSanPham> existsBySpAndMsAndSize(@Param("idSp") Integer idSp,
                                   @Param("idMs") Integer idMs,
                                   @Param("idSize") Integer idSize);

    @Query(value = "SELECT ctsp.id_ctsp, ms.ten_ms,\n" +
            "sz.ten_size,\n" +
            "ctsp.gia_nhap,\n" +
            "ctsp.gia_ban,\n" +
            "ctsp.so_luong_ton,\n" +
            "ctsp.trang_thai\n" +
            "FROM \n" +
            "  chi_tiet_san_pham ctsp\n" +
            "JOIN \n" +
            "  mau_sac ms ON ctsp.id_ms = ms.id_ms\n" +
            "JOIN \n" +
            "  size sz ON ctsp.id_size = sz.id_size\n" +
            "WHERE id_sp = :idSp",nativeQuery = true)
    List<Object[]> ctspForAd(@Param("idSp") Integer idSp);

}