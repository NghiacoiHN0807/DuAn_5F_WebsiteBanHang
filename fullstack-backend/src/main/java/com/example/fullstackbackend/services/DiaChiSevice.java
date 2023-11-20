package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.DiaChi;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface DiaChiSevice {

    List<DiaChi> getAllByTK(String maTaiKhoan);

    List<DiaChi> getAll();


    DiaChi add(DiaChi add);

    void delete(Integer id);

    Boolean checkExists(Integer id);

    DiaChi update(DiaChi update);

    Optional<DiaChi> detail(Integer id);
}
