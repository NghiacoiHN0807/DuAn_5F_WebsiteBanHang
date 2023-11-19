package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

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

    Boolean checkExists(Integer id);

}
