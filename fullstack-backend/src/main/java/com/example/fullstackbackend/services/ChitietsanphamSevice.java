package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface ChitietsanphamSevice {
    Page<ChiTietSanPham> chatlieuPage(Integer pageNo, Integer size, Integer trangThai);
}
