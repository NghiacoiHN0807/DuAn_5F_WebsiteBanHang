package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.LichSuGiamGia;
import com.example.fullstackbackend.repository.LichSuGiamGiaRepository;
import com.example.fullstackbackend.services.LichSuGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LichSuGiamGiaServiceImpl implements LichSuGiamGiaService {

    @Autowired
    private LichSuGiamGiaRepository lichSuGiamGiaRepository;

    @Override
    public Page<LichSuGiamGia> getAll(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return lichSuGiamGiaRepository.findAll(pageable);
    }

    @Override
    public Optional<LichSuGiamGia> getOne(Integer id) {
        return lichSuGiamGiaRepository.findById(id);
    }

    @Override
    public Object add(LichSuGiamGia lichSuGiamGia) {
        return lichSuGiamGiaRepository.save(lichSuGiamGia);
    }

    @Override
    public Object update(LichSuGiamGia lichSuGiamGia) {
        return lichSuGiamGiaRepository.save(lichSuGiamGia);
    }

    @Override
    public void remove(Integer id) {
        lichSuGiamGiaRepository.deleteById(id);
    }

    @Override
    public Boolean existsById(Integer id) {
        return lichSuGiamGiaRepository.existsById(id);
    }
}
