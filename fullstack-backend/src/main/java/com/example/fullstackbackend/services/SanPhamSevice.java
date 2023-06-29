package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.SanPham;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface SanPhamSevice {

    List<SanPham> getAll();

    Page<SanPham> chatlieuPage(Integer pageNo, Integer size);

    void add(SanPham add);

    void delete(Integer id);

    void update(SanPham update);

    Optional<SanPham> detail(Integer id);
}
