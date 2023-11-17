package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface GiamGiaChiTietRepository extends JpaRepository<GiamGiaChiTiet, Integer> {

    @Query(value = "SELECT count(*) FROM giam_gia_chi_tiet WHERE id_sp =:idSp", nativeQuery = true)
    Integer existsByIdSp_IdSp(@Param("idSp") Integer idSp);

    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.trangThai = :trangThai")
    List<GiamGiaChiTiet> findAllByTrangThai(@Param("trangThai") Integer trangThai);

//    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.idGiamGia.tenChuongTrinh = :value " +
//            "OR g.idSp.tenSp = :value " +
//            "OR g.donGia = :value " +
//            "OR g.soTienConLai = :value ")
//    Page<GiamGiaChiTiet> findAllByValue(@Param("value") String value, Pageable pageable);

    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.idGiamGia.ngayBatDau = :ngayBatDau AND g.idGiamGia.ngayKetThuc = :ngayKetThuc")
    List<GiamGiaChiTiet> findAllByDate(@Param("ngayBatDau") LocalDate ngayBatDau, @Param("ngayKetThuc") LocalDate ngayKetThuc);

    @Modifying
    @Query(value = "UPDATE chi_tiet_san_pham " +
            "SET gia_thuc_te = " +
            "    CASE " +
            "        WHEN :discountType = 'percentage' THEN (gia_ban - (gia_ban * :value / 100)) " +
            "        WHEN :discountType = 'amount' THEN (gia_ban - :value) " +
            "        ELSE gia_ban " +
            "    END " +
            "WHERE id_sp = :idSp", nativeQuery = true)
    void updateCtsp(@Param("discountType") String discountType, @Param("value") BigDecimal value, @Param("idSp") Integer idSp);

    @Query(value = "SELECT * FROM chi_tiet_san_pham WHERE gia_ban > gia_thuc_te", nativeQuery = true)
    List<ChiTietSanPham> ctspGiamGia();

    @Query(value = "SELECT muc_giam_phan_tram FROM giam_gia " +
            "join giam_gia_chi_tiet on giam_gia.id_giam_gia = " +
            "giam_gia_chi_tiet.id_giam_gia where giam_gia_chi_tiet.id_sp =:idSp"
            , nativeQuery = true)
    String typeGiam(Integer idSp);

    @Query(value = "SELECT muc_giam_phan_tram, muc_giam_tien_mat FROM giam_gia " +
            "join giam_gia_chi_tiet on giam_gia.id_giam_gia = giam_gia_chi_tiet.id_giam_gia " +
            "where giam_gia_chi_tiet.id_sp = :idSp " +
            "ORDER BY giam_gia_chi_tiet.id_ggct DESC LIMIT 1", nativeQuery = true)
    List<Object[]> mucGiam(@Param("idSp") Integer idSp);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM giam_gia_chi_tiet WHERE giam_gia_chi_tiet.id_sp = :idSp", nativeQuery = true)
    void deleteGgctByidSp(@Param(("idSp")) Integer idSp);

//    @Query(value = "SELECT g FROM GiamGiaChiTiet g where g.idSp.idSp = :idSp")

    @Modifying
    @Query(value = "update chi_tiet_san_pham set gia_thuc_te = gia_ban where id_sp = :idSp", nativeQuery = true)
    void updateCtsp(@Param("idSp") Integer idSp);

    @Modifying
    @Query(value = "update giam_gia set trang_thai = :trangThai where id_giam_gia = :idGiamGia", nativeQuery = true)
    void updateTrangThaiGiamGia(@Param("trangThai") Integer trangThai, @Param("idGiamGia") Integer idGiamGia);

    @Modifying
    @Query(value = "update giam_gia_chi_tiet set trang_thai = :trangThai where id_giam_gia = :idGiamGia", nativeQuery = true)
    void updateTrangThaiGiamGiaChiTiet(@Param("trangThai") Integer trangThai, @Param("idGiamGia") Integer idGiamGia);

    @Query(value = "select * from giam_gia_chi_tiet where id_giam_gia = :idGiamGia", nativeQuery = true)
    List<GiamGiaChiTiet> findByIdGiamGia(@Param("idGiamGia") Integer idGiamGia);

}