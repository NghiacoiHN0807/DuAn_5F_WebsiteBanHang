package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface SanphamRepository extends JpaRepository<SanPham, Integer> {

    @Query(value = "SELECT sp.id_sp, sp.ma_sp, sp.ten_sp, sp.id_cl, sp.id_ms, sp.id_loaisp, sp.id_xx, sp.id_tay_ao, sp.id_co_ao, sp.mo_ta, sp.gia_ban, sp.trang_thai, img.images\n" +
            "FROM san_pham sp\n" +
            "LEFT JOIN (\n" +
            "    SELECT id_sp, MIN(id_images) AS first_image_id\n" +
            "    FROM images\n" +
            "    GROUP BY id_sp\n" +
            ") AS first_img ON sp.id_sp = first_img.id_sp\n" +
            "LEFT JOIN images img ON first_img.first_image_id = img.id_images;", nativeQuery = true)
    Page<Object[]> getSpWithImg(Pageable pageable);

}