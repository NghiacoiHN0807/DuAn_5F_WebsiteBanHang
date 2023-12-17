package com.example.fullstackbackend.services;

import com.example.fullstackbackend.DTO.CTSPCustom;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ChitietsanphamService {
    Page<ChiTietSanPham> chiTietSP(Integer pageNo, Integer size);

    List<Object[]> getSanPhamsWithSizes();

    List<ChiTietSanPham> findByProductName(String name);

    Optional<ChiTietSanPham> findByProductNameAndSize(String name, String Size, String ms);

    List<ChiTietSanPham> findByIdSp(Integer id);

    List<ChiTietSanPham> findByProductId(Integer id);

    ChiTietSanPham add(ChiTietSanPham add);

    ChiTietSanPham addAndUpdateSize(ChiTietSanPham ctsp, Integer soLuong);

    ChiTietSanPham delete(Integer id);

    ChiTietSanPham update(ChiTietSanPham update);

    Optional<ChiTietSanPham> detail(Integer id);

    List<ChiTietSanPham> finAllByIDCTSP(Integer idCtsp);

    Optional<ChiTietSanPham> findByIdCTSP(Integer idCTSP);

    Boolean checkExists(Integer id);

    ChiTietSanPham addColorAndSize(Integer idSp, Integer idMs, Integer idSize);

    ChiTietSanPham updateNumber(Integer idCtsp, BigDecimal giaNhap, BigDecimal giaBan, Integer soLuongTon, Integer trangThai);

    List<CTSPCustom> getCtspForAd(Integer idSp);

    ChiTietSanPham checkAttExist(Integer idSp, Integer idMs, Integer idSize);

}
