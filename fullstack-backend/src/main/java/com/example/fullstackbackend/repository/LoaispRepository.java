package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.LoaiSp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository

public interface LoaispRepository extends JpaRepository<LoaiSp, Integer> {

}