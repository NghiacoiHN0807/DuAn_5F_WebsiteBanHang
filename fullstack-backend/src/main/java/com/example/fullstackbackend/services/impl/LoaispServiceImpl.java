package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.repository.LoaispRepository;
import com.example.fullstackbackend.services.LoaispSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoaispServiceImpl implements LoaispSevice {

    @Autowired
    private LoaispRepository loaispRepository;

    @Override
    public Page<LoaiSp> chatlieuPage(Integer pageNo, Integer size, Integer trangThai) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return loaispRepository.findAllByTrangThai(trangThai, pageable);
    }
}
