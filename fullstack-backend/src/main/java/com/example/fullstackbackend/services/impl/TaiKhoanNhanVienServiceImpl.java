package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.TaiKhoan;
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
class TaiKhoanNhanVienServiceImpl implements TaiKhoanNhanVienService {
    @Autowired
    private TaiKhoanNhanVienRepository taiKhoanRepository;

    @Override
    public List<TaiKhoan> getAll() {
        return taiKhoanRepository.findAll();
    }

    @Override
    public Page<TaiKhoan> phanTrang(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return taiKhoanRepository.findAll(pageable);
    }

    @Override
    public Page<TaiKhoan> phanTrang(Integer pageNo, Integer size, Integer trangThai) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return taiKhoanRepository.findAllByTrangThai(trangThai, pageable);
    }

    @Override
    public TaiKhoan add(TaiKhoan taiKhoan) {
        return taiKhoanRepository.save(taiKhoan);
    }



    @Override
    public Optional<TaiKhoan> getOne(Integer id) {
        return taiKhoanRepository.findById(id);
    }

    @Override
    public TaiKhoan delete(Integer id) {
        TaiKhoan taiKhoan = getOne(id).orElseThrow();
        taiKhoan.setTrangThai(10);
        taiKhoanRepository.save(taiKhoan);
        return taiKhoan;
    }

    @Override
    public TaiKhoan update(TaiKhoan taiKhoan, Integer id) {
        taiKhoan.setIdTaiKhoan(id);
        return taiKhoanRepository.save(taiKhoan);
    }

    @Override
    public Boolean existsById(Integer id) {
        return taiKhoanRepository.existsById(id);
    }

    @Override
    public Optional<TaiKhoan> detail(Integer id) {
        Optional<TaiKhoan> taiKhoan = taiKhoanRepository.findById(id);
        return taiKhoan;
    }

    @Override
    public Page<TaiKhoan> chucVu(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return taiKhoanRepository.chucVu(pageable);
    }
}
