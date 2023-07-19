package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.OngTayAo;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface OngTayAoService {

    List<OngTayAo> getAll();

    Page<OngTayAo> OngTayAoPage(Integer pageNo, Integer size);

    void add(OngTayAo add);

    void delete(Integer id);

    void update(OngTayAo update);

    Optional<OngTayAo> detail(Integer id);
}
