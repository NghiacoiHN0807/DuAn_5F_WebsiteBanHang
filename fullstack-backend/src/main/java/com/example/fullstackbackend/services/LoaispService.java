package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.LoaiSp;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface LoaispService {

    List<LoaiSp> getAll();

    Page<LoaiSp> loaiSpPage(Integer pageNo, Integer size);

    LoaiSp add(LoaiSp add);

    void delete(Integer id);

    LoaiSp update(LoaiSp update);

    Optional<LoaiSp> detail(Integer id);

    Boolean checkExists(Integer id);
}
