package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.LoaiCoAo;
import com.example.fullstackbackend.entity.OngTayAo;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface LoaiCoAoService {

    List<LoaiCoAo> getAll();

    Page<LoaiCoAo> LoaiCoAoPage(Integer pageNo, Integer size);

    void add(LoaiCoAo add);

    void delete(Integer id);

    void update(LoaiCoAo update);

    Optional<LoaiCoAo> detail(Integer id);
}
