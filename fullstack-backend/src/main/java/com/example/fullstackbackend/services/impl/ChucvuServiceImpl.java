package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChucVu;
import com.example.fullstackbackend.repository.ChucvuRepository;
import com.example.fullstackbackend.services.ChucvuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChucvuServiceImpl implements ChucvuService {

    @Autowired
    private ChucvuRepository chucvuRepository;

    @Override
    public List<ChucVu> getAll() {
        return chucvuRepository.findAll();
    }

    @Override
    public Page<ChucVu> phanTrang(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return chucvuRepository.findAll(pageable);
    }

    @Override
    public ChucVu add(ChucVu chucVu) {
        return chucvuRepository.save(chucVu);
    }

    @Override
    public void delete(Integer id) {
        chucvuRepository.deleteById(id);
    }

    @Override
    public ChucVu update(ChucVu chucVu) {
        return chucvuRepository.save(chucVu);
    }

    @Override
    public Boolean existsById(Integer id) {
        return chucvuRepository.existsById(id);
    }

    @Override
    public Optional<ChucVu> detail(Integer id) {
        Optional<ChucVu> chucVu = chucvuRepository.findById(id);
        return chucVu;
    }
}
