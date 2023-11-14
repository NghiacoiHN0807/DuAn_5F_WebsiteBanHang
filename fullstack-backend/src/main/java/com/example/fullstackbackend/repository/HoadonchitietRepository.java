package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;


@Repository
public interface HoadonchitietRepository extends JpaRepository<HoaDonChiTiet, Integer> {
    @Query(value = "SELECT id_hdct, id_ctsp, id_hd, so_luong, don_gia, ly_do_huy, trang_thai FROM duan_5f.hoa_don_chi_tiet where id_hd = ?1", nativeQuery = true)
    List<HoaDonChiTiet> detailHDCT(Integer id);

    @Query(value = "UPDATE HoaDonChiTiet hdct SET hdct.idCtsp=?1,hdct.soLuong =?2, hdct.donGia =?3 where hdct.idHd =?4")
    HoaDonChiTiet updateCart(ChiTietSanPham idCTSP, Integer soLuong, BigDecimal donGia, Integer idHD);

    @Query(value = "SELECT hd.id_hd, hdct.id_hdct, GROUP_CONCAT(DISTINCT img.images ORDER BY img.images ASC) AS img, sp.id_sp, sp.ma_sp, sp.ten_sp, GROUP_CONCAT(DISTINCT s.ten_size ORDER BY s.ten_size ASC) AS size, ct.gia_thuc_te, hdct.so_luong, hdct.don_gia, ct.id_ctsp, GROUP_CONCAT(DISTINCT ms.ten_ms ORDER BY ms.ten_ms ASC) AS mau_sac\n" +
            "FROM duan_5f.chi_tiet_san_pham ct\n" +
            "JOIN duan_5f.san_pham sp ON ct.id_sp = sp.id_sp\n" +
            "JOIN duan_5f.images img ON img.id_sp = sp.id_sp\n" +
            "JOIN duan_5f.size s ON ct.id_size = s.id_size\n" +
            "JOIN duan_5f.mau_sac ms ON ct.id_ms = ms.id_ms\n" +
            "JOIN duan_5f.hoa_don_chi_tiet hdct ON ct.id_ctsp = hdct.id_ctsp\n" +
            "JOIN duan_5f.hoa_don hd ON hd.id_hd = hdct.id_hd\n" +
            "WHERE ct.trang_thai =0 AND hd.id_hd= ?1\n" +
            "GROUP BY hd.id_hd, hdct.id_hdct, sp.id_sp, sp.ma_sp, sp.ten_sp,ct.gia_thuc_te, hdct.so_luong, hdct.don_gia, ct.id_ctsp\n" +
            "ORDER BY sp.ma_sp DESC", nativeQuery = true, countQuery = "SELECT COUNT(DISTINCT ct.id_ctsp)\n" +
            "FROM duan_5f.chi_tiet_san_pham ct\n" +
            "JOIN duan_5f.san_pham sp ON ct.id_sp = sp.id_sp\n" +
            "JOIN duan_5f.images img ON img.id_sp = sp.id_sp\n" +
            "JOIN duan_5f.size s ON ct.id_size = s.id_size\n" +
            "JOIN duan_5f.mau_sac ms ON ct.id_ms = ms.id_ms\n" +
            "JOIN duan_5f.hoa_don_chi_tiet hdct ON ct.id_ctsp = hdct.id_ctsp\n" +
            "JOIN duan_5f.hoa_don hd ON hd.id_hd = hdct.id_hd\n" +
            "WHERE ct.trang_thai = 0 AND hd.id_hd = ?1")
    List<Object[]> getListProductOncart(Integer idHd);

}