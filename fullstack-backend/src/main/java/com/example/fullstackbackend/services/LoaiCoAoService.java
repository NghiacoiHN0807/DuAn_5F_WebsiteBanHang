package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.LoaiCoAo;
import com.example.fullstackbackend.entity.OngTayAo;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface LoaiCoAoService {

    List<LoaiCoAo> getAll();

    Page<LoaiCoAo> loaiCoAoPage(Integer pageNo, Integer size);

    LoaiCoAo add(LoaiCoAo add);

    void delete(Integer id);

    LoaiCoAo update(LoaiCoAo update);

    Optional<LoaiCoAo> detail(Integer id);

    Boolean checkExists(Integer id);
}
