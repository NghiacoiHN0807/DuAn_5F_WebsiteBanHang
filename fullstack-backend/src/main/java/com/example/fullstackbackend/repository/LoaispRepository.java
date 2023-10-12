package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.LoaiSp;
<<<<<<< HEAD
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
=======
import org.springframework.data.jpa.repository.JpaRepository;
>>>>>>> main
import org.springframework.stereotype.Repository;


@Repository

public interface LoaispRepository extends JpaRepository<LoaiSp, Integer> {

<<<<<<< HEAD
    @Query("SELECT g FROM LoaiSp g WHERE g.trangThai = :trangThai")
    Page<LoaiSp> findAllByTrangThai(@Param("trangThai") Integer trangThai, Pageable pageable);
=======
>>>>>>> main
}