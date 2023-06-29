package com.example.fullstackbackend.services;


import com.example.fullstackbackend.entity.Size;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface SizeSevice {

    List<Size> getAll();

    Page<Size> chatlieuPage(Integer pageNo, Integer size);

    void add(Size add);

    void delete(Integer id);

    void update(Size update);

    Optional<Size> detail(Integer id);
}
