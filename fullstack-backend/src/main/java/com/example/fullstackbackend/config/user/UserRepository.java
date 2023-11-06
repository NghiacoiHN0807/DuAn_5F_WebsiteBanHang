package com.example.fullstackbackend.config.user;

import com.example.fullstackbackend.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<TaiKhoanUser, Integer> {

    @Query("select t from TaiKhoanUser t where t.email = ?1 AND t.trangThai = 0")
    TaiKhoanUser findByEmail(String email);
}
