package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.HinhThucThanhToan;

import java.util.List;

public interface HinhThucThanhToanSevice {
    List<HinhThucThanhToan> getAll();

    HinhThucThanhToan add(HinhThucThanhToan add);

    void delete(Integer id);

    HinhThucThanhToan update(HinhThucThanhToan update);

    List<HinhThucThanhToan> detail(Integer id);

}