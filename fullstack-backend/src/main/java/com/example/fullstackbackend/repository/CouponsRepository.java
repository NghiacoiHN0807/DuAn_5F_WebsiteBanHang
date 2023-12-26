package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.Coupons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CouponsRepository extends JpaRepository<Coupons, Integer> {
    Optional<Coupons> findByCode(String code);
}
