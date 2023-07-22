package com.example.fullstackbackend.services;


import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.entity.ChucVu;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ChucvuService {
    List<ChucVu> getAll();

    Page<ChucVu> phanTrang(Integer pageNo, Integer size);

    Object add(ChucVu chucVu);

    void delete(Integer id);

    Object update(ChucVu chucVu);

    Optional<ChucVu> detail(Integer id);

    Boolean existsById(Integer id);

    List<ChucVu> getByMa(String ma);
}
