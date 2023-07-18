package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
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

}