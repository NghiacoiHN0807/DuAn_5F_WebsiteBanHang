package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.OngTayAo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OngTayAoRepository extends JpaRepository<OngTayAo, Integer> {
}
