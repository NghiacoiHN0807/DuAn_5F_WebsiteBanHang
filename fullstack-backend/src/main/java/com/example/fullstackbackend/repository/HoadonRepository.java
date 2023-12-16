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


    @Query(value = "SELECT x from HoaDon x where x.trangThai = ?1")
    List<HoaDon> findAllByTrangThai(Integer trangThai);

    @Query(value = "SELECT x from HoaDon x where x.idHd =?1 and x.trangThai = ?2")
    List<HoaDon> findAllByIDAndTrangThai(Integer idHd, Integer trangThai);

    @Query(value = "SELECT x from HoaDon x where x.maHd = ?1")
    HoaDon findByMaHd(Integer maHD);

    @Query(value = "SELECT x from HoaDon x where x.trangThai = 8 or x.trangThai = 9")
    List<HoaDon> pageOfflineInvoice();

    @Query(value = "SELECT x from HoaDon x where x.trangThai = 8 ORDER BY x.maHd DESC")
    List<HoaDon> selectAllInvoiceWaiting();

    @Query(value = "SELECT x from HoaDon x where x.trangThai = 1 or x.trangThai = 2 or x.trangThai = 3 or x.trangThai = 4 " +
            "or x.trangThai = 5 or x.trangThai = 9 or x.trangThai = 10 or x.trangThai = 0 ORDER BY x.maHd DESC")
    List<HoaDon> pageOnlineInvoice();


//    @Query(value = "SELECT x FROM HoaDon x WHERE x.idKH =?1 AND x.trangThai = 0 AND x.trangThai = 1 AND x.trangThai = 2 AND x.trangThai =3AND x.trangThai =4 AND x.trangThai =5 AND x.trangThai =6 AND x.trangThai =8 AND x.trangThai =9 AND x.trangThai =10")
    List<HoaDon> findAllByIdKH_IdTaiKhoan(Integer idKh);

    @Modifying
    @Transactional
    @Query(value = "UPDATE HoaDon hd SET hd.trangThai= 10 WHERE hd.idHd=?1")
    void delete(Integer idHD);

    @Query(value = "SELECT SUM(tong_tien) AS total_revenue \n" +
            "FROM hoa_don where trang_thai = 9 or trang_thai = 5;", nativeQuery = true)
    Double calculateTotalTongTien();


    @Query(value = "SELECT COUNT(*) AS total_invoice\n" +
            "\tFROM hoa_don\n" +
            "\tWHERE trang_thai = 9 or trang_thai = 5;", nativeQuery = true)
    long totalInvoice();

    @Query(value = "SELECT DATE(ngay_thanh_toan) AS Ngay, SUM(thanh_tien) AS TongDoanhThu\n" +
            "FROM duan_5f.hoa_don\n" +
            "WHERE ngay_thanh_toan IS NOT NULL\n" +
            "GROUP BY DATE(ngay_thanh_toan)", nativeQuery = true)
    List<Object[]> getTotalRevenueByDay();

    @Query(value = "SELECT\n" +
            "                IFNULL(((COUNT(CASE WHEN trang_thai = 6 THEN 1 END) / COUNT(CASE WHEN trang_thai IN (5, 9) THEN 1 END)) * 100), 0) AS ty_le_tra_hang\n" +
            "            FROM duan_5f.hoa_don\n" +
            "            WHERE trang_thai IN (5, 6, 9);", nativeQuery = true)
    Double getTyLeTraHang();


    @Query(value = "SELECT SUM(so_luong) AS tong_so_luong_da_ban\n" +
            "FROM duan_5f.hoa_don_chi_tiet  hdct\n" +
            "join duan_5f.hoa_don hd on hdct.id_hd = hd.id_hd\n" +
            "where hd.trang_thai = 9 or hd.trang_thai = 5;", nativeQuery = true)
    long getTongSpBan();
}