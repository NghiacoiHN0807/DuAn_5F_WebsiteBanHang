package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ChitietsanphamService {
    Page<ChiTietSanPham> chiTietSP(Integer pageNo, Integer size);

    List<ChiTietSanPham> findByProductName(String name);

    ChiTietSanPham add(ChiTietSanPham add);

    void delete(Integer id);

    ChiTietSanPham update(ChiTietSanPham update);

    Optional<ChiTietSanPham> detail(Integer id);
    Boolean checkExists(Integer id);
}