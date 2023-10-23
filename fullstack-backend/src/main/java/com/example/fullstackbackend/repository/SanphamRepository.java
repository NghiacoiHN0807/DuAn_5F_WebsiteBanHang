package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SanphamRepository extends JpaRepository<SanPham, Integer> {

    @Query("SELECT s FROM SanPham s WHERE s.trangThai = :tinhTrang")
    Page<SanPham> findAllByTinhTrang(@Param("tinhTrang") Integer tinhTrang, Pageable pageable);

    @Query(value = "SELECT san_pham.*, MIN(images.images)\n" +
            "            FROM san_pham\n" +
            "            LEFT JOIN Images ON san_pham.id_sp = images.id_sp\n" +
            "            GROUP BY san_pham.id_sp", nativeQuery = true)
    List<Object[]> getSanPhamWithMinImageUrl();

    @Query(value =
            "SELECT \n" +
                    "                        san_pham.id_sp,\n" +
                    "                        san_pham.ma_sp,\n" +
                    "                        san_pham.ten_sp,\n" +
                    "                        giam_gia.ten_chuong_trinh,\n" +
                    "                        giam_gia.muc_giam_phan_tram,\n" +
                    "                        giam_gia.muc_giam_tien_mat,\n" +
                    "                        images.images,\n" +
                    "                        giam_gia_chi_tiet.*,\n" +
                    "                        giam_gia.ngay_bat_dau,\n" +
                    "                        giam_gia.ngay_ket_thuc,\n" +
                    "                        chi_tiet_san_pham.*\n" +
                    "                    FROM san_pham\n" +
                    "                    LEFT JOIN chi_tiet_san_pham ON san_pham.id_sp = chi_tiet_san_pham.id_sp\n" +
                    "                    LEFT JOIN giam_gia_chi_tiet ON san_pham.id_sp = giam_gia_chi_tiet.id_sp\n" +
                    "                    LEFT JOIN giam_gia ON giam_gia_chi_tiet.id_giam_gia = giam_gia.id_giam_gia\n" +
                    "                    LEFT JOIN (\n" +
                    "                        SELECT id_sp, MIN(images) AS id_image, MIN(images) AS images\n" +
                    "                        FROM images\n" +
                    "                        GROUP BY id_sp\n" +
                    "                    ) images ON san_pham.id_sp = images.id_sp\n" +
                    "                    WHERE chi_tiet_san_pham.gia_thuc_te < chi_tiet_san_pham.gia_ban;",
            nativeQuery = true)
    List<Object[]> getSanPhamDetails();

    @Query(value = "SELECT sp.id_sp, sp.ma_sp, sp.ten_sp, sp.id_cl, sp.id_ms, sp.id_loaisp, sp.id_xx, sp.id_tay_ao, sp.id_co_ao, sp.mo_ta, sp.gia_ban, sp.trang_thai, img.images, GROUP_CONCAT(ctsp.id_size) AS id_sizes\n" +
            "FROM san_pham sp\n" +
            "LEFT JOIN (\n" +
            "    SELECT id_sp, MIN(id_images) AS first_image_id\n" +
            "    FROM images\n" +
            "    GROUP BY id_sp\n" +
            ") AS first_img ON sp.id_sp = first_img.id_sp\n" +
            "LEFT JOIN images img ON first_img.first_image_id = img.id_images\n" +
            "LEFT JOIN chi_tiet_san_pham ctsp ON sp.id_sp = ctsp.id_sp\n" +
            "GROUP BY sp.id_sp, sp.ma_sp, sp.ten_sp, sp.id_cl, sp.id_ms, sp.id_loaisp, sp.id_xx, sp.id_tay_ao, sp.id_co_ao, sp.mo_ta, sp.gia_ban, sp.trang_thai, img.images;\n", nativeQuery = true)
    Page<Object[]> getSpWithImg(Pageable pageable);

}