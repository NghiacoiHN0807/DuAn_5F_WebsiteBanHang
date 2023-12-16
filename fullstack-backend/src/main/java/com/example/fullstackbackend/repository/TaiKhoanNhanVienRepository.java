package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TaiKhoanNhanVienRepository extends JpaRepository<TaiKhoan, Integer> {
    @Query("SELECT g FROM TaiKhoan g ")
    List<TaiKhoan> findAllByTrangThai();

    @Query(value = "SELECT *\n" +
            "FROM duan_5f.tai_khoan\n" +
            "WHERE id_chuc_vu IN (1, 8);", nativeQuery = true)
    List<TaiKhoan> chucVu();

    @Query("select (count(t) > 0) from TaiKhoan t where upper(t.email) = upper(?1)")
    boolean existsByEmailAllIgnoreCase(String email);


}
