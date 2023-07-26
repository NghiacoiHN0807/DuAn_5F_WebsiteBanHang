package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.SanphamRepository;
import com.example.fullstackbackend.services.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SanphamServiceImpl implements SanPhamService {

    @Autowired
    private SanphamRepository sanphamRepository;

    @Override
    public Page<SanPham> getAll(Integer pageNo, Integer limit, Integer tinhTrang) {
        Pageable pageable = PageRequest.of(pageNo, limit);
        return sanphamRepository.findAllByTinhTrang(tinhTrang, pageable);
    }
}
