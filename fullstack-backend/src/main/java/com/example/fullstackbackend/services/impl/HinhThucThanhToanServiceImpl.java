package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.HinhThucThanhToan;
import com.example.fullstackbackend.repository.HinhThucThanhToanRepository;
import com.example.fullstackbackend.services.HinhThucThanhToanSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class HinhThucThanhToanServiceImpl implements HinhThucThanhToanSevice {

    @Autowired
    private HinhThucThanhToanRepository HinhThucThanhToanRepository;

    @Override
    public List<HinhThucThanhToan> getAll() {
        return HinhThucThanhToanRepository.findAll();
    }




    @Override
    public HinhThucThanhToan add(HinhThucThanhToan add) {
        return HinhThucThanhToanRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        HinhThucThanhToanRepository.deleteById(id);
    }

    @Override
    public HinhThucThanhToan update(HinhThucThanhToan update) {
        return null;
    }

    @Override
    public List<HinhThucThanhToan> detail(Integer id) {

        return HinhThucThanhToanRepository.findByIdHd(id);
    }
}
