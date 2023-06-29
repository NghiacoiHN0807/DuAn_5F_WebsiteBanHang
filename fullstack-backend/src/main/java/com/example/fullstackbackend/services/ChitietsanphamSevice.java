package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface ChitietsanphamSevice {
    Page<ChiTietSanPham> chatlieuPage(Integer pageNo, Integer size);

    void add(ChiTietSanPham add);

    void delete(Integer id);

    void update(ChiTietSanPham update);

    Optional<ChiTietSanPham> detail(Integer id);
}
