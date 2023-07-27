package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.LichSuGiamGia;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface LichSuGiamGiaService {

    Page<LichSuGiamGia> getAll(Integer pageNo, Integer size);

    Optional<LichSuGiamGia> getOne(Integer id);

    Object add(LichSuGiamGia lichSuGiamGia);

    Object update(LichSuGiamGia lichSuGiamGia);

    void remove(Integer id);

    Boolean existsById(Integer id);

}
