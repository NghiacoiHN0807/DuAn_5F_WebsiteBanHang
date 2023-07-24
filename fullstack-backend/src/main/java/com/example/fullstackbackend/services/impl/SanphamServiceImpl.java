package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.SanphamRepository;
import com.example.fullstackbackend.services.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SanphamServiceImpl implements SanPhamService {

    @Autowired
    private SanphamRepository sanphamRepository;

    @Override
    public List<SanPham> getAll() {
        return sanphamRepository.findAll();
    }

    @Override
    public Page<SanPham> sanPhamPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return sanphamRepository.findAll(pageable);
    }

    @Override
    public SanPham add(SanPham add) {
        return sanphamRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        sanphamRepository.deleteById(id);
    }

    @Override
    public SanPham update(SanPham update) {
        return sanphamRepository.save(update);
    }

    @Override
    public Optional<SanPham> detail(Integer id) {
        return sanphamRepository.findById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return sanphamRepository.existsById(id);
    }

}
