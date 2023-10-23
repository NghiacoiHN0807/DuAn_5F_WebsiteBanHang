package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.DTO.MucGiamDTO;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface GiamGiaChiTietRepository extends JpaRepository<GiamGiaChiTiet, Integer> {

    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.trangThai = :trangThai")
    Page<GiamGiaChiTiet> findAllByTrangThai(@Param("trangThai") Integer trangThai, Pageable pageable);

//    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.idGiamGia.tenChuongTrinh = :value " +
//            "OR g.idSp.tenSp = :value " +
//            "OR g.donGia = :value " +
//            "OR g.soTienConLai = :value ")
//    Page<GiamGiaChiTiet> findAllByValue(@Param("value") String value, Pageable pageable);

    @Query("SELECT g FROM GiamGiaChiTiet g WHERE g.idGiamGia.ngayBatDau = :ngayBatDau AND g.idGiamGia.ngayKetThuc = :ngayKetThuc")
    Page<GiamGiaChiTiet> findAllByDate(@Param("ngayBatDau") LocalDate ngayBatDau, @Param("ngayKetThuc") LocalDate ngayKetThuc, Pageable pageable);

    @Query("SELECT g.idGiamGia.idGiamGia FROM GiamGiaChiTiet g WHERE g.idGgct = :id")
    Integer findByIdGiamGia_IdGiamGia(@Param("id") Integer id);

    @Query(value = "UPDATE chi_tiet_san_pham " +
            "SET gia_thuc_te = " +
            "    CASE " +
            "        WHEN :discountType = 'percentage' THEN (gia_ban - (gia_ban * :value / 100)) " +
            "        WHEN :discountType = 'amount' THEN (gia_ban - :value) " +
            "        ELSE gia_ban " +
            "    END " +
            "WHERE id_sp = :idSp;", nativeQuery = true)
    ChiTietSanPham updateCtsp(@Param("discountType") String discountType, @Param("value") BigDecimal value, @Param("idSp") Integer idSp);

    @Query(value = "SELECT * FROM chi_tiet_san_pham WHERE gia_ban > gia_thuc_te", nativeQuery = true)
    List<ChiTietSanPham> ctspGiamGia();

    @Query(value = "SELECT muc_giam_phan_tram FROM giam_gia " +
            "join giam_gia_chi_tiet on giam_gia.id_giam_gia = " +
            "giam_gia_chi_tiet.id_giam_gia where giam_gia_chi_tiet.id_sp =:idSp"
            , nativeQuery = true)
    String typeGiam(Integer idSp);

    @Query(value = "SELECT muc_giam_phan_tram, muc_giam_tien_mat FROM giam_gia " +
            "join giam_gia_chi_tiet on giam_gia.id_giam_gia = giam_gia_chi_tiet.id_giam_gia " +
            "where giam_gia_chi_tiet.id_sp =:idSp", nativeQuery = true)
    MucGiamDTO mucGiam(Integer idSp);

}