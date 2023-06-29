package com.example.fullstackbackend.services.impl;


import com.example.fullstackbackend.entity.MauSac;
import com.example.fullstackbackend.repository.MausacRepository;
import com.example.fullstackbackend.services.MausacSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MausacServiceImpl implements MausacSevice {

    @Autowired
    private MausacRepository mausacRepository;

    @Override
    public List<MauSac> getAll() {
        return mausacRepository.findAll();
    }

    @Override
    public Page<MauSac> chatlieuPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return mausacRepository.findAll(pageable);
    }

    @Override
    public void add(MauSac add) {
        mausacRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        mausacRepository.deleteById(id);
    }

    @Override
    public void update(MauSac update) {
        mausacRepository.save(update);
    }

    @Override
    public Optional<MauSac> detail(Integer id) {
        Optional<MauSac> mausac = mausacRepository.findById(id);
        return mausac;
    }


}
