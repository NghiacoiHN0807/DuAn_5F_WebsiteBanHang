package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.repository.SizeRepository;
import com.example.fullstackbackend.services.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<Size> getAll() {
        return sizeRepository.findAll();
    }

    @Override
    public Page<Size> sizePage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return sizeRepository.findAll(pageable);
    }

    @Override
    public Size add(Size add) {
       return sizeRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        sizeRepository.deleteById(id);
    }

    @Override
    public Size update(Size update) {
        return sizeRepository.save(update);
    }

    @Override
    public Optional<Size> detail(Integer id) {
        return sizeRepository.findById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return sizeRepository.existsById(id);
    }
}
