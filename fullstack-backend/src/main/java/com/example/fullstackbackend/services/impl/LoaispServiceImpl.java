package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.repository.LoaispRepository;
<<<<<<< HEAD
import com.example.fullstackbackend.services.LoaispSevice;
=======
import com.example.fullstackbackend.services.LoaispService;
>>>>>>> main
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
<<<<<<< HEAD
public class LoaispServiceImpl implements LoaispSevice {
=======
public class LoaispServiceImpl implements LoaispService {
>>>>>>> main

    @Autowired
    private LoaispRepository loaispRepository;

    @Override
<<<<<<< HEAD
    public Page<LoaiSp> chatlieuPage(Integer pageNo, Integer size, Integer trangThai) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return loaispRepository.findAllByTrangThai(trangThai, pageable);
=======
    public List<LoaiSp> getAll() {
        return loaispRepository.findAll();
    }

    @Override
    public Page<LoaiSp> loaiSpPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return loaispRepository.findAll(pageable);
    }

    @Override
    public LoaiSp add(LoaiSp add) {
        return loaispRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        loaispRepository.deleteById(id);
    }

    @Override
    public LoaiSp update(LoaiSp update) {
        return loaispRepository.save(update);
    }

    @Override
    public Optional<LoaiSp> detail(Integer id) {
        Optional<LoaiSp> Loaisp = loaispRepository.findById(id);
        return Loaisp;
    }

    @Override
    public Boolean checkExists(Integer id) {
        return loaispRepository.existsById(id);
>>>>>>> main
    }
}
