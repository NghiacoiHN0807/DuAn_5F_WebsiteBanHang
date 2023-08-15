package com.example.fullstackbackend.repository;

import com.example.fullstackbackend.entity.SanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SanphamRepository extends JpaRepository<SanPham, Integer> {
    @Query("SELECT sp, MIN(img.images) " +
            "FROM SanPham sp " +
            "LEFT JOIN Images img ON sp.idSp = img.idSp.idSp " +
            "GROUP BY sp.idSp")
    List<Object[]> getSanPhamWithMinImageUrl();

    @Query(value =
            "SELECT \n" +
                    "    sp.id_sp,\n" +
                    "    sp.ma_sp,\n" +
                    "    sp.ten_sp,\n" +
                    "    sz.ten_size,\n" +
                    "    img.image_url,\n" +
                    "    gg.ten_chuong_trinh,\n" +
                    "    gg.muc_giam_phan_tram,\n" +
                    "    gg.muc_giam_tien_mat,\n" +
                    "    ggct.*,\n" +
                    "    gg.ngay_bat_dau,\n" +
                    "    gg.ngay_ket_thuc\n" +
                    "FROM san_pham sp\n" +
                    "JOIN chi_tiet_san_pham cts ON sp.id_sp = cts.id_sp\n" +
                    "JOIN giam_gia_chi_tiet ggct ON cts.id_ctsp = ggct.id_ctsp\n" +
                    "JOIN giam_gia gg ON ggct.id_giam_gia = gg.id_giam_gia\n" +
                    "JOIN size sz ON cts.id_size = sz.id_size\n" +
                    "JOIN (\n" +
                    "    SELECT id_sp, MIN(images) AS id_image, MIN(images) AS image_url\n" +
                    "    FROM images\n" +
                    "    GROUP BY id_sp\n" +
                    ") img ON sp.id_sp = img.id_sp;",
            nativeQuery = true)
    Page<Object[]> getSanPhamDetails(Pageable pageable);


}