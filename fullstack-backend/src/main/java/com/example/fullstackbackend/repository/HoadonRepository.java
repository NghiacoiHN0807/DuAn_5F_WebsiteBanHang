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


    @Query(value = "SELECT SUM(tong_tien) AS total_revenue \n" +
            "FROM hoa_don where trang_thai = 4;", nativeQuery = true)
    Double calculateTotalTongTien();


    @Query(value = "SELECT COUNT(*) AS total_invoice\n" +
            "\tFROM hoa_don\n" +
            "\tWHERE trang_thai = 4;", nativeQuery = true)
    long totalInvoice();

    @Query(value = "SELECT DATE(ngay_thanh_toan) AS Ngay, SUM(thanh_tien) AS TongDoanhThu\n" +
            "FROM duan_5f.hoa_don\n" +
            "WHERE ngay_thanh_toan IS NOT NULL\n" +
            "GROUP BY DATE(ngay_thanh_toan)", nativeQuery = true)
    List<Object[]> getTotalRevenueByDay();

    @Query(value = "SELECT DISTINCT \n" +
            "    (COUNT(DISTINCT hd.id_hd) - COUNT(DISTINCT lsgg.id_hd)) / COUNT(DISTINCT hd.id_hd) * 100 AS TyLeTraHang\n" +
            "FROM \n" +
            "    duan_5f.hoa_don hd\n" +
            "LEFT JOIN \n" +
            "    duan_5f.hoa_don_chi_tiet hdct ON hd.id_hd = hdct.id_hd\n" +
            "LEFT JOIN \n" +
            "    duan_5f.lich_su_giam_gia lsgg ON hd.id_hd = lsgg.id_hd\n" +
            "WHERE \n" +
            "    hd.trang_thai = 1\n" +
            "GROUP BY \n" +
            "    hd.id_tai_khoan", nativeQuery = true)
    Double getTyLeTraHang();

    @Query(value = "SELECT SUM(so_luong) AS tong_so_luong_da_ban\n" +
            "FROM duan_5f.hoa_don_chi_tiet;", nativeQuery = true)
    long getTongSpBan();
}