package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SizeRepository extends JpaRepository<Size, Integer> {

}