package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.repository.SizeRepository;
import com.example.fullstackbackend.services.SizeSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImpl implements SizeSevice {

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<Size> getAll() {
        return sizeRepository.findAll();
    }

    @Override
    public Page<Size> chatlieuPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return sizeRepository.findAll(pageable);
    }

    @Override
    public void add(Size add) {
        sizeRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        sizeRepository.deleteById(id);
    }

    @Override
    public void update(Size update) {
        sizeRepository.save(update);
    }

    @Override
    public Optional<Size> detail(Integer id) {
        Optional<Size> xuatxu = sizeRepository.findById(id);
        return xuatxu;
    }
}
