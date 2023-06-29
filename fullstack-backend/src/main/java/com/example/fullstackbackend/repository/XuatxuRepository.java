package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.XuatXu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface XuatxuRepository extends JpaRepository<XuatXu, Integer> {

}