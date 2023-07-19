package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.repository.ChitietsanphamRepository;
import com.example.fullstackbackend.services.ChitietsanphamSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChitietsanphamServiceImpl implements ChitietsanphamSevice {

    @Autowired
    private ChitietsanphamRepository chitietsanphamRepository;
    @Override
    public Page<ChiTietSanPham> chiTietSP(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return chitietsanphamRepository.findAll(pageable);
    }

    @Override
    public ChiTietSanPham add(ChiTietSanPham add) {
        return chitietsanphamRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        chitietsanphamRepository.deleteById(id);
    }

    @Override
    public void update(ChiTietSanPham update) {
        chitietsanphamRepository.save(update);
    }

    @Override
    public Optional<ChiTietSanPham> detail(Integer id) {
        Optional<ChiTietSanPham> xuatxu = chitietsanphamRepository.findById(id);
        return xuatxu;
    }

}
