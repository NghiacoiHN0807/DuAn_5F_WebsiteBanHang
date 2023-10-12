package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.HinhThucThanhToan;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface HinhThucThanhToanSevice {
    List<HinhThucThanhToan> getAll();


    HinhThucThanhToan add(HinhThucThanhToan add);

    void delete(Integer id);


    HinhThucThanhToan update(HinhThucThanhToan update);

    List<HinhThucThanhToan> detail(Integer id);

}
