package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.entity.TaiKhoanNhanVien;
import com.example.fullstackbackend.repository.TaiKhoanNhanVienRepository;
import com.example.fullstackbackend.services.TaiKhoanNhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanNhanVienNhanVienServiceImpl implements TaiKhoanNhanVienService {
    @Autowired
    private TaiKhoanNhanVienRepository taiKhoanNhanVienRepository;

    @Override
    public List<TaiKhoanNhanVien> getAll() {
        return taiKhoanNhanVienRepository.findAll();
    }

    @Override
    public Page<TaiKhoanNhanVien> phanTrang(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return taiKhoanNhanVienRepository.findAll(pageable);
    }

    @Override
    public Page<TaiKhoanNhanVien> phanTrang(Integer pageNo, Integer size, Integer trangThai) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return taiKhoanNhanVienRepository.findAllByTrangThai(trangThai, pageable);
    }

    @Override
    public TaiKhoanNhanVien add(TaiKhoanNhanVien taiKhoanNhanVien) {
        return taiKhoanNhanVienRepository.save(taiKhoanNhanVien);
    }

    @Override
    public Optional<TaiKhoanNhanVien> getOne(Integer id) {
        return taiKhoanNhanVienRepository.findById(id);
    }

    @Override
    public void delete(Integer id) {
        TaiKhoanNhanVien taiKhoanNhanVien = getOne(id).orElseThrow();
        taiKhoanNhanVien.setTrangThai(10);
        taiKhoanNhanVienRepository.save(taiKhoanNhanVien);
    }

    @Override
    public TaiKhoanNhanVien update(TaiKhoanNhanVien taiKhoanNhanVien) {
        return taiKhoanNhanVienRepository.save(taiKhoanNhanVien);
    }

    @Override
    public Boolean existsById(Integer id) {
        return taiKhoanNhanVienRepository.existsById(id);
    }

    @Override
    public Optional<TaiKhoanNhanVien> detail(Integer id) {
        Optional<TaiKhoanNhanVien> taiKhoan = taiKhoanNhanVienRepository.findById(id);
        return taiKhoan;
    }
}
