package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChucVu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChucvuRepository extends JpaRepository<ChucVu, Integer> {

    List<ChucVu> findAllByMaCv(String ma);

}
