package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.LoaiCoAo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoaiCoAoRepository extends JpaRepository<LoaiCoAo, Integer> {
}
