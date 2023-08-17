package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.GiamGia;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface GiamGiaService {

    Page<GiamGia> getAll(Integer pageNo, Integer size, Integer trangThai);

    List<GiamGia> getByMa(String ma);

    Optional<GiamGia> getOne(Integer id);

    Object add(GiamGia giamGia);

    Object update(GiamGia giamGia);

    Boolean existsById(Integer id);

    void remove(Integer id);

//    void addGiamGiaWithChiTiet(GiamGiaWithChiTietDTO request);

}
