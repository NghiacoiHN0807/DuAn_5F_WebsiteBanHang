package com.example.fullstackbackend.services;


import com.example.fullstackbackend.entity.ChucVu;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ChucvuService {
    List<ChucVu> getAll();

    List<ChucVu> phanTrang();

    ChucVu add(ChucVu chucVu);

    void delete(Integer id);

    ChucVu update(ChucVu chucVu);

    Boolean existsById(Integer id);

    Optional<ChucVu> detail(Integer id);

    ChucVu detailTen(String tenCv);
}
