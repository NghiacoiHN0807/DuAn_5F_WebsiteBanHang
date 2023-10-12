package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.MauSac;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface MausacService {
    List<MauSac> getAll();

    Page<MauSac> mauSacPage(Integer pageNo, Integer size);

    MauSac add(MauSac add);

    void delete(Integer id);

    MauSac update(MauSac update);

    Optional<MauSac> detail(Integer id);

    Boolean checkExists(Integer id);
}
