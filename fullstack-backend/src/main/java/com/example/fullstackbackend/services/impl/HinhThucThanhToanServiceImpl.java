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
    private HinhThucThanhToanRepository hinhThucThanhToanRepository;

    @Override
    public List<HinhThucThanhToan> getAll() {
        return null;
    }

    @Override
    public Page<HinhThucThanhToan> htttPages(Integer pageNo, Integer size) {
        return null;
    }


    @Override
    public HinhThucThanhToan add(HinhThucThanhToan add) {
        return hinhThucThanhToanRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        hinhThucThanhToanRepository.deleteById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return hinhThucThanhToanRepository.existsById(id);
    }

    @Override
    public HinhThucThanhToan update(HinhThucThanhToan update) {
        return null;
    }

    @Override
    public List<HinhThucThanhToan> detailByIdHd(Integer id) {
        List<HinhThucThanhToan> getList = hinhThucThanhToanRepository.selectByIdHd(id);
        return getList;
    }
}
