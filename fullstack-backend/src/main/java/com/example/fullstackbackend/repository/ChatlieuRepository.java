package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.ChatLieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ChatlieuRepository extends JpaRepository<ChatLieu, Integer> {

}