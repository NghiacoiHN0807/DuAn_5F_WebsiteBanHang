package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.LoaiCoAo;
import com.example.fullstackbackend.repository.LoaiCoAoRepository;
import com.example.fullstackbackend.services.LoaiCoAoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoaiCoAoServiceImpl implements LoaiCoAoService {

    @Autowired
    private LoaiCoAoRepository loaiCoAoRepository;

    @Override
    public List<LoaiCoAo> getAll() {
        return loaiCoAoRepository.findAll();
    }

    @Override
    public Page<LoaiCoAo> loaiCoAoPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return loaiCoAoRepository.findAll(pageable);
    }

    @Override
    public LoaiCoAo add(LoaiCoAo add) {
        return loaiCoAoRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        loaiCoAoRepository.deleteById(id);
    }

    @Override
    public LoaiCoAo update(LoaiCoAo update) {
        return loaiCoAoRepository.save(update);
    }

    @Override
    public Optional<LoaiCoAo> detail(Integer id) {
        return loaiCoAoRepository.findById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return loaiCoAoRepository.existsById(id);
    }
}
