package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.GiamGia;
import com.example.fullstackbackend.repository.GiamGiaRepository;
import com.example.fullstackbackend.services.GiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GiamGiaServiceImpl implements GiamGiaService {

    @Autowired
    private GiamGiaRepository giamGiaRepository;

    @Override
    public Page<GiamGia> getAll(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return giamGiaRepository.findAll(pageable);
    }

    @Override
    public List<GiamGia> getByMa(String ma) {
        return giamGiaRepository.findByMaGiamGia(ma);
    }

    @Override
    public Optional<GiamGia> getOne(Integer id) {
        return giamGiaRepository.findById(id);
    }

    @Override
    public Object add(GiamGia giamGia) {
        return giamGiaRepository.save(giamGia);
    }

    @Override
    public Object update(GiamGia giamGia) {
        return giamGiaRepository.save(giamGia);
    }

    @Override
    public Boolean existsById(Integer id) {
        return giamGiaRepository.existsById(id);
    }

    @Override
    public void remove(Integer id) {
        giamGiaRepository.deleteById(id);
    }
}
