package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.repository.TaiKhoanKhachHangRepository;
import com.example.fullstackbackend.repository.TaiKhoanKhachHangRepository;
import com.example.fullstackbackend.services.TaiKhoanKhachHangSevice;
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
    private TaiKhoanKhachHangRepository TaiKhoanRepository;


    @Override
    public List<TaiKhoan> getAll() {
        return TaiKhoanRepository.findAll();
    }

    @Override
    public Page<TaiKhoan> Page(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return TaiKhoanRepository.findAll(pageable);
    }

    @Override
    public TaiKhoan add(TaiKhoan add) {
        return TaiKhoanRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        TaiKhoanRepository.deleteById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return TaiKhoanRepository.existsById(id);
    }

    @Override
    public TaiKhoan update(TaiKhoan update) {
       return TaiKhoanRepository.save(update);
    }

    @Override
    public Optional<TaiKhoan> detail(Integer id) {
        Optional<TaiKhoan> TaiKhoan = TaiKhoanRepository.findById(id);
        return TaiKhoan;
    }
}
