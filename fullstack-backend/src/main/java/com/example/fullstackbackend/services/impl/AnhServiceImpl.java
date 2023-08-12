package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.Anh;
import com.example.fullstackbackend.repository.AnhRepository;
import com.example.fullstackbackend.services.AnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnhServiceImpl implements AnhService {

    @Autowired
    private AnhRepository anhRepository;

    @Override
    public List<Anh> getAll() {
        return anhRepository.findAll();
    }

    @Override
    public Anh getOne(Integer idImage) {
        return anhRepository.findById(idImage).orElse(null);
    }

    @Override
    public Anh add(Anh a) {
        return anhRepository.save(a);
    }

    @Override
    public Anh delete(Integer id) {
        return null;
    }
}
