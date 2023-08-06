package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.repository.ChitietsanphamRepository;
import com.example.fullstackbackend.services.ChitietsanphamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChitietsanphamServiceImpl implements ChitietsanphamService {

    @Autowired
    private ChitietsanphamRepository chitietsanphamRepository;
    @Override
    public Page<ChiTietSanPham> chiTietSP(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return chitietsanphamRepository.findAll(pageable);
    }
    @Override
    public List<ChiTietSanPham> findByProductName(String name) {
        return chitietsanphamRepository.findByProductName(name);
    }

    @Override
    public List<ChiTietSanPham> findByIdSp(Integer id) {
        return chitietsanphamRepository.findByIdSp(id);
    }


    public List<ChiTietSanPham> findByProductId(Integer id) {
        return chitietsanphamRepository.findByProductId(id);
    }

    @Override
    public ChiTietSanPham add(ChiTietSanPham add) {
        return chitietsanphamRepository.save(add);
    }

    @Override
    public void delete(Integer id) {

        chitietsanphamRepository.findById(id).orElse(null).setTrangThai(10);
    }

    @Override
    public ChiTietSanPham update(ChiTietSanPham update) {
        return chitietsanphamRepository.save(update);
    }

    @Override
    public Optional<ChiTietSanPham> detail(Integer id) {
        return chitietsanphamRepository.findById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return chitietsanphamRepository.existsById(id);
    }

}
