package com.example.fullstackbackend.services.impl;



import com.example.fullstackbackend.entity.TaiKhoanKhachHang;
import com.example.fullstackbackend.repository.TaiKhoanKhachHangRepository;
import com.example.fullstackbackend.services.TaiKhoanKhachHangSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanKhachHangServiceImpl implements TaiKhoanKhachHangSevice {

    @Autowired
    private TaiKhoanKhachHangRepository TaiKhoanKhachHangRepository;


    @Override
    public List<TaiKhoanKhachHang> getAll() {
        return TaiKhoanKhachHangRepository.findAll();
    }

    @Override
    public Page<TaiKhoanKhachHang> Page(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return TaiKhoanKhachHangRepository.findAll(pageable);
    }

    @Override
    public TaiKhoanKhachHang add(TaiKhoanKhachHang add) {
        return TaiKhoanKhachHangRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        TaiKhoanKhachHangRepository.deleteById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return TaiKhoanKhachHangRepository.existsById(id);
    }

    @Override
    public TaiKhoanKhachHang update(TaiKhoanKhachHang update) {
       return TaiKhoanKhachHangRepository.save(update);
    }

    @Override
    public Optional<TaiKhoanKhachHang> detail(Integer id) {
        Optional<TaiKhoanKhachHang> TaiKhoanKhachHang = TaiKhoanKhachHangRepository.findById(id);
        return TaiKhoanKhachHang;
    }
}
