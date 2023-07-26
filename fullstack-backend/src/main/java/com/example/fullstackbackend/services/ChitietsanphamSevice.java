package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ChitietsanphamSevice {

    Page<ChiTietSanPham> chiTietSanPhamPage(Integer pageNo, Integer size);

    List<ChiTietSanPham> findByProductName(String name);

    ChiTietSanPham add(ChiTietSanPham add);

//    ChiTietSanPham delete(Integer id);

    ChiTietSanPham update(ChiTietSanPham update);

    Optional<ChiTietSanPham> detail(Integer id);
}
