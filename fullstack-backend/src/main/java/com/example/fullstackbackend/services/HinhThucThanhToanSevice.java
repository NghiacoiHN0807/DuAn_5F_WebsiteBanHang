package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.HinhThucThanhToan;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface HinhThucThanhToanSevice {
    List<HinhThucThanhToan> getAll();

    Page<HinhThucThanhToan> htttPages(Integer pageNo, Integer size);

    HinhThucThanhToan add(HinhThucThanhToan add);

    void delete(Integer id);

    Boolean checkExists(Integer id);

    HinhThucThanhToan update(HinhThucThanhToan update);

    List<HinhThucThanhToan> detail(Integer id);

}
