package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository

public interface HoadonRepository extends JpaRepository<HoaDon, Integer> {

}