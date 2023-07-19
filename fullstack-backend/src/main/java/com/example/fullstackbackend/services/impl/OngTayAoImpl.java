package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.OngTayAo;
import com.example.fullstackbackend.repository.OngTayAoRepository;
import com.example.fullstackbackend.services.OngTayAoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OngTayAoImpl implements OngTayAoService {

    @Autowired
    private OngTayAoRepository ongTayAoRepository;

    @Override
    public List<OngTayAo> getAll() {
        return ongTayAoRepository.findAll();
    }

    @Override
    public Page<OngTayAo> OngTayAoPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return ongTayAoRepository.findAll(pageable);
    }

    @Override
    public void add(OngTayAo add) {
        ongTayAoRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        ongTayAoRepository.deleteById(id);
    }

    @Override
    public void update(OngTayAo update) {
        ongTayAoRepository.save(update);
    }

    @Override
    public Optional<OngTayAo> detail(Integer id) {
        return ongTayAoRepository.findById(id);
    }
}
