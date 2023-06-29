package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.SanphamRepository;
import com.example.fullstackbackend.services.SanPhamSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SanphamServiceImpl implements SanPhamSevice {

    @Autowired
    private SanphamRepository sanphamRepository;

    @Override
    public List<SanPham> getAll() {
        return sanphamRepository.findAll();
    }

    @Override
    public Page<SanPham> chatlieuPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return sanphamRepository.findAll(pageable);
    }

    @Override
    public void add(SanPham add) {
        sanphamRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        sanphamRepository.deleteById(id);
    }

    @Override
    public void update(SanPham update) {
        sanphamRepository.save(update);
    }

    @Override
    public Optional<SanPham> detail(Integer id) {
        Optional<SanPham> xuatxu = sanphamRepository.findById(id);
        return xuatxu;
    }

}
