package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.LoaiSp;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface LoaispSevice {

    List<LoaiSp> getAll();

    Page<LoaiSp> chatlieuPage(Integer pageNo, Integer size);

    void add(LoaiSp add);

    void delete(Integer id);

    void update(LoaiSp update);

    Optional<LoaiSp> detail(Integer id);
}
