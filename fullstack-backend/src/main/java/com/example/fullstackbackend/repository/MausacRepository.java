package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository

public interface MausacRepository extends JpaRepository<MauSac, Integer> {

}