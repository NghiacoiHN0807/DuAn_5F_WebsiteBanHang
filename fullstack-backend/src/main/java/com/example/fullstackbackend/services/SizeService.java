package com.example.fullstackbackend.services;


import com.example.fullstackbackend.entity.Size;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface SizeService {

    List<Size> getAll();

    Page<Size> sizePage(Integer pageNo, Integer size);

    Size add(Size add);

    void delete(Integer id);

    Size update(Size update);

    Optional<Size> detail(Integer id);

    Boolean checkExists(Integer id);
}
