package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface GiamGiaChiTietService {

    Page<GiamGiaChiTiet> getAll(Integer pageNo, Integer size, Integer trangThai);

    Optional<GiamGiaChiTiet> getOne(Integer id);

    Object add(GiamGiaChiTiet giamGiaChiTiet);

    Object update(GiamGiaChiTiet giamGiaChiTiet);

    Boolean existsById(Integer id);

    void remove(Integer id);

}
