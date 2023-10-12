package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.repository.SizeRepository;
<<<<<<< HEAD
import com.example.fullstackbackend.services.SizeSevice;
=======
import com.example.fullstackbackend.services.SizeService;
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
public class SizeServiceImpl implements SizeSevice {
=======
public class SizeServiceImpl implements SizeService {
>>>>>>> main

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<Size> getAll() {
        return sizeRepository.findAll();
    }

    @Override
<<<<<<< HEAD
    public Page<Size> chatlieuPage(Integer pageNo, Integer size) {
=======
    public Page<Size> sizePage(Integer pageNo, Integer size) {
>>>>>>> main
        Pageable pageable = PageRequest.of(pageNo, size);
        return sizeRepository.findAll(pageable);
    }

    @Override
<<<<<<< HEAD
    public void add(Size add) {
        sizeRepository.save(add);
=======
    public Size add(Size add) {
       return sizeRepository.save(add);
>>>>>>> main
    }

    @Override
    public void delete(Integer id) {
        sizeRepository.deleteById(id);
    }

    @Override
<<<<<<< HEAD
    public void update(Size update) {
        sizeRepository.save(update);
=======
    public Size update(Size update) {
        return sizeRepository.save(update);
>>>>>>> main
    }

    @Override
    public Optional<Size> detail(Integer id) {
<<<<<<< HEAD
        Optional<Size> xuatxu = sizeRepository.findById(id);
        return xuatxu;
=======
        return sizeRepository.findById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return sizeRepository.existsById(id);
>>>>>>> main
    }
}
