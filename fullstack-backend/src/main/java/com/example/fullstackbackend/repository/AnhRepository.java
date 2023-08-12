package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.Anh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnhRepository extends JpaRepository<Anh, Integer> {
}
