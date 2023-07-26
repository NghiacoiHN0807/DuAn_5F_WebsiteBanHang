package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.SanPham;
import org.springframework.data.domain.Page;

public interface SanPhamService {

    Page<SanPham> getAll(Integer pageNo, Integer limit, Integer tinhTrang);

}
