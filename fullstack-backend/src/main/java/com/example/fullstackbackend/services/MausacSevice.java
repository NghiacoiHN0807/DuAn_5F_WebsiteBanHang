package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.MauSac;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface MausacSevice {
    List<MauSac> getAll();

    Page<MauSac> chatlieuPage(Integer pageNo, Integer size);

    void add(MauSac add);

    void delete(Integer id);

    void update(MauSac update);

    Optional<MauSac> detail(Integer id);
}
