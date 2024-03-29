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

    @Query(value = "SELECT \n" +
            "                sp.*, \n" +
            "                MIN(img.images),\n" +
            "                MIN(ctsp.gia_ban) AS gia_ban_nho_nhat,\n" +
            "                MAX(ctsp.gia_ban) AS gia_ban_lon_nhat,\n" +
            "                ggct.trang_thai\n" +
            "            FROM \n" +
            "                san_pham sp\n" +
            "            LEFT JOIN \n" +
            "            Images img ON sp.id_sp = img.id_sp\n" +
            "            LEFT JOIN \n" +
            "                chi_tiet_san_pham ctsp ON sp.id_sp = ctsp.id_sp\n" +
            "\t\t\tLEFT JOIN\n" +
            "\t\t\t\tgiam_gia_chi_tiet ggct ON sp.id_sp = ggct.id_sp\n" +
            "            WHERE \n" +
            "                ctsp.gia_ban = ctsp.gia_thuc_te\n" +
            "            GROUP BY \n" +
            "                sp.id_sp, sp.ten_sp, ggct.trang_thai;", nativeQuery = true)
    List<Object[]> getSanPhamWithMinImageUrl();

    @Query(value = "SELECT  \n" +
            "                            sp.*,  \n" +
            "                            MIN(img.images), \n" +
            "                            MIN(ctsp.gia_ban) AS gia_ban_nho_nhat, \n" +
            "                            MAX(ctsp.gia_ban) AS gia_ban_lon_nhat,\n" +
            "                            ggct.trang_thai \n" +
            "                        FROM  \n" +
            "                            san_pham sp \n" +
            "                        LEFT JOIN  \n" +
            "                            Images img ON sp.id_sp = img.id_sp \n" +
            "                        LEFT JOIN  \n" +
            "                            chi_tiet_san_pham ctsp ON sp.id_sp = ctsp.id_sp \n" +
            "\t\t\t\t\t\tLEFT JOIN\n" +
            "\t\t\t\t\t\t\tgiam_gia_chi_tiet ggct ON sp.id_sp = ggct.id_sp\n" +
            "\t\t\t\t\t\tLEFT JOIN\n" +
            "\t\t\t\t\t\t\tgiam_gia gg ON ggct.id_giam_gia = gg.id_giam_gia\n" +
            "                        WHERE  \n" +
            "                            gg.id_giam_gia =:idGg AND (ggct.trang_thai = 0 OR ggct.trang_thai = 1)\n" +
            "                        GROUP BY  \n" +
            "                            sp.id_sp, sp.ten_sp, ggct.trang_thai", nativeQuery = true)
    List<Object[]> getSanPhamWithMinImageUrlByIdGiamGia(@Param("idGg") Integer idGg);

    @Query(value =
            "SELECT \n" +
                    "    san_pham.id_sp,\n" +
                    "    san_pham.ma_sp,\n" +
                    "    san_pham.ten_sp,\n" +
                    "    giam_gia.ten_chuong_trinh,\n" +
                    "    giam_gia.muc_giam_phan_tram,\n" +
                    "    giam_gia.muc_giam_tien_mat,\n" +
                    "    images.images,\n" +
                    "    giam_gia_chi_tiet.id_ggct,\n" +
                    "    giam_gia.id_giam_gia,\n" +
                    "    giam_gia.ngay_bat_dau,\n" +
                    "    giam_gia.ngay_ket_thuc,\n" +
                    "    MIN(chi_tiet_san_pham.gia_ban) as gia_ban_min,\n" +
                    "    MAX(chi_tiet_san_pham.gia_ban) as gia_ban_max,\n" +
                    "    MIN(chi_tiet_san_pham.gia_thuc_te) as gia_thuc_te_min,\n" +
                    "    MAX(chi_tiet_san_pham.gia_thuc_te) as gia_thuc_te_max,\n" +
                    "    giam_gia_chi_tiet.trang_thai\n" +
                    "FROM \n" +
                    "    san_pham\n" +
                    "LEFT JOIN \n" +
                    "    chi_tiet_san_pham ON san_pham.id_sp = chi_tiet_san_pham.id_sp\n" +
                    "LEFT JOIN \n" +
                    "    giam_gia_chi_tiet ON san_pham.id_sp = giam_gia_chi_tiet.id_sp\n" +
                    "LEFT JOIN \n" +
                    "    giam_gia ON giam_gia_chi_tiet.id_giam_gia = giam_gia.id_giam_gia\n" +
                    "LEFT JOIN (\n" +
                    "    SELECT \n" +
                    "        id_sp, \n" +
                    "        MIN(images) AS id_image, \n" +
                    "        MIN(images) AS images\n" +
                    "    FROM \n" +
                    "        images\n" +
                    "    GROUP BY \n" +
                    "        id_sp\n" +
                    ") images ON san_pham.id_sp = images.id_sp\n" +
                    "WHERE \n" +
                    "    giam_gia_chi_tiet.trang_thai = 0 OR giam_gia_chi_tiet.trang_thai = 1\n" +
                    "GROUP BY \n" +
                    "    san_pham.id_sp, \n" +
                    "    san_pham.ten_sp,\n" +
                    "    giam_gia.ten_chuong_trinh,\n" +
                    "    giam_gia.muc_giam_phan_tram,\n" +
                    "    giam_gia.muc_giam_tien_mat,\n" +
                    "    images.images,\n" +
                    "    giam_gia.ngay_bat_dau,\n" +
                    "    giam_gia.ngay_ket_thuc,\n" +
                    "    giam_gia_chi_tiet.id_ggct,\n" +
                    "    giam_gia.id_giam_gia",
            nativeQuery = true)
    List<Object[]> getSanPhamDetails();

    @Query(value = "SELECT\n" +
            "    sp.id_sp,\n" +
            "    sp.ma_sp,\n" +
            "    sp.ten_sp,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_cl) as id_cl,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_loaisp) as id_loaisp,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_xx) as id_xx,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_tay_ao) as id_tay_ao,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_co_ao) as id_co_ao,\n" +
            "    GROUP_CONCAT(DISTINCT ct.id_size) as id_size,\n" +
            "    GROUP_CONCAT(DISTINCT ct.id_ms) as id_ms,\n" +
            "    sp.mo_ta,\n" +
            "    sp.trang_thai,\n" +
            "    (SELECT img.images FROM images img WHERE img.id_sp = sp.id_sp ORDER BY img.id_images LIMIT 1) AS first_image,\n" +
            "    ctsp.min_gia_ban,\n" +
            "    ctsp.max_gia_ban,\n" +
            "    ctsp.giam_gia\n" +
            "FROM\n" +
            "    san_pham sp\n" +
            "LEFT JOIN\n" +
            "    chi_tiet_san_pham ct ON sp.id_sp = ct.id_sp\n" +
            "LEFT JOIN\n" +
            "    (SELECT\n" +
            "        id_sp,\n" +
            "        MIN(gia_ban) as min_gia_ban,\n" +
            "        MAX(gia_ban) as max_gia_ban,\n" +
            "        MIN(gia_thuc_te) as giam_gia\n" +
            "    FROM\n" +
            "        chi_tiet_san_pham\n" +
            "    GROUP BY\n" +
            "        id_sp) ctsp ON sp.id_sp = ctsp.id_sp\n" +
            "GROUP BY\n" +
            "    sp.id_sp, ctsp.min_gia_ban, ctsp.max_gia_ban, ctsp.giam_gia\n" +
            "ORDER BY id_sp DESC", nativeQuery = true)
    List<Object[]> getSpForAdmin();

    @Query(value = "SELECT\n" +
            "            sp.id_sp,\n" +
            "            GROUP_CONCAT(DISTINCT sp.id_cl) as id_cl,\n" +
            "            GROUP_CONCAT(DISTINCT sp.id_loaisp) as id_loaisp,\n" +
            "            GROUP_CONCAT(DISTINCT sp.id_xx) as id_xx,\n" +
            "            GROUP_CONCAT(DISTINCT sp.id_tay_ao) as id_tay_ao,\n" +
            "            GROUP_CONCAT(DISTINCT sp.id_co_ao) as id_co_ao,\n" +
            "            GROUP_CONCAT(DISTINCT ct.id_size) as id_size,\n" +
            "            GROUP_CONCAT(DISTINCT ct.id_ms) as id_ms,\n" +
            "\n" +
            "            sp.ten_sp,\n" +
            "            sp.trang_thai,\n" +
            "            (SELECT img.images FROM images img WHERE img.id_sp = sp.id_sp ORDER BY img.id_images LIMIT 1) AS first_image,\n" +
            "            ctsp.min_gia_ban,\n" +
            "            ctsp.max_gia_ban,\n" +
            "            ctsp.giam_gia,\n" +
            "            MAX(gia_thuc_te) as max_giam_gia\n" +
            "            \n" +
            "            FROM san_pham sp\n" +
            "            JOIN chi_tiet_san_pham ct ON sp.id_sp = ct.id_sp\n" +
            "            LEFT JOIN (\n" +
            "\t\t\tSELECT id_sp,\n" +
            "            MIN(gia_ban) as min_gia_ban,\n" +
            "            MAX(gia_ban) as max_gia_ban,\n" +
            "            MIN(gia_thuc_te) as giam_gia,\n" +
            "            MAX(gia_thuc_te) as max_giam_gia\n" +
            "            FROM chi_tiet_san_pham\n" +
            "            WHERE trang_thai = 0\n" +
            "            GROUP BY id_sp\n" +
            "            ) ctsp ON sp.id_sp = ctsp.id_sp\n" +
            " \n" +
            "            GROUP BY sp.id_sp, ctsp.min_gia_ban, ctsp.max_gia_ban, ctsp.giam_gia\n" +
            "            HAVING sp.trang_thai = 0 OR sp.trang_thai = 1;", nativeQuery = true)
    List<Object[]> getSpForClient();


    @Query(value = "SELECT sp.id_sp, sp.ten_sp, SUM(hdct.so_luong) AS so_luong_ban\n" +
            "FROM san_pham sp\n" +
            "JOIN chi_tiet_san_pham ctsp ON sp.id_sp = ctsp.id_sp\n" +
            "JOIN hoa_don_chi_tiet hdct ON ctsp.id_ctsp = hdct.id_ctsp\n" +
            "GROUP BY sp.id_sp, sp.ten_sp\n" +
            "ORDER BY so_luong_ban DESC\n" +
            "LIMIT 4;", nativeQuery = true)
    List<Object[]> topSptrending();

    @Query(value = "SELECT \n" +
            "                            sp.id_sp,\n" +
            "                            GROUP_CONCAT(DISTINCT sp.id_cl) as id_cl, \n" +
            "                            GROUP_CONCAT(DISTINCT sp.id_loaisp) as id_loaisp,\n" +
            "                            GROUP_CONCAT(DISTINCT sp.id_xx) as id_xx, \n" +
            "                            GROUP_CONCAT(DISTINCT sp.id_tay_ao) as id_tay_ao,\n" +
            "                            GROUP_CONCAT(DISTINCT sp.id_co_ao) as id_co_ao, \n" +
            "                            GROUP_CONCAT(DISTINCT ct.id_size) as id_size,\n" +
            "                            GROUP_CONCAT(DISTINCT ct.id_ms) as id_ms,\n" +
            "                            sp.ten_sp,\n" +
            "                            sp.trang_thai,\n" +
            "                            (SELECT img.images FROM images img WHERE img.id_sp = sp.id_sp ORDER BY img.id_images LIMIT 1) AS first_image,\n" +
            "                            ctsp.min_gia_ban,\n" +
            "                            ctsp.max_gia_ban, \n" +
            "                            ctsp.giam_gia\n" +
            "                        FROM san_pham sp\n" +
            "                        JOIN chi_tiet_san_pham ct ON sp.id_sp = ct.id_sp\n" +
            "                        LEFT JOIN (\n" +
            "                          SELECT id_sp, \n" +
            "                                 MIN(gia_ban) as min_gia_ban, \n" +
            "                                 MAX(gia_ban) as max_gia_ban,\n" +
            "                                 MIN(gia_thuc_te) as giam_gia\n" +
            "                          FROM chi_tiet_san_pham\n" +
            "                          GROUP BY id_sp\n" +
            "                        ) ctsp ON sp.id_sp = ctsp.id_sp\n" +
            "                        WHERE (sp.trang_thai = 0 OR sp.trang_thai = 1) AND min_gia_ban > giam_gia AND ct.so_luong_ton > 0\n" +
            "                        GROUP BY sp.id_sp, ctsp.min_gia_ban, ctsp.max_gia_ban, ctsp.giam_gia", nativeQuery = true)
    List<Object[]> getSpGiamGiaForClient();

    @Query(value = "SELECT \n" +
            "    sp.id_sp,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_cl) AS id_cl, \n" +
            "    GROUP_CONCAT(DISTINCT sp.id_loaisp) AS id_loaisp,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_xx) AS id_xx, \n" +
            "    GROUP_CONCAT(DISTINCT sp.id_tay_ao) AS id_tay_ao,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_co_ao) AS id_co_ao, \n" +
            "    GROUP_CONCAT(DISTINCT ct.id_size) AS id_size,\n" +
            "    GROUP_CONCAT(DISTINCT ct.id_ms) AS id_ms,\n" +
            "    sp.ten_sp,\n" +
            "    sp.trang_thai,\n" +
            "    (SELECT img.images FROM images img WHERE img.id_sp = sp.id_sp ORDER BY img.id_images LIMIT 1) AS first_image,\n" +
            "    ctsp.min_gia_ban,\n" +
            "    ctsp.max_gia_ban, \n" +
            "    ctsp.giam_gia,\n" +
            "    SUM(hdct.so_luong) AS so_luong_ban\n" +
            "FROM san_pham sp\n" +
            "JOIN chi_tiet_san_pham ct ON sp.id_sp = ct.id_sp\n" +
            "LEFT JOIN (\n" +
            "    SELECT id_sp, \n" +
            "           MIN(gia_ban) AS min_gia_ban, \n" +
            "           MAX(gia_ban) AS max_gia_ban,\n" +
            "           MIN(gia_thuc_te) AS giam_gia\n" +
            "    FROM chi_tiet_san_pham\n" +
            "    GROUP BY id_sp\n" +
            ") ctsp ON sp.id_sp = ctsp.id_sp\n" +
            "LEFT JOIN hoa_don_chi_tiet hdct ON ct.id_ctsp = hdct.id_ctsp\n" +
            "LEFT JOIN hoa_don hd ON hdct.id_hd = hd.id_hd\n" +
            "WHERE (sp.trang_thai = 0 OR sp.trang_thai = 1) AND (hd.trang_thai = 5 OR hd.trang_thai = 9) AND (hdct.trang_thai = 0) AND ct.so_luong_ton > 0\n" +
            "GROUP BY sp.id_sp, sp.ten_sp, sp.trang_thai, first_image, ctsp.min_gia_ban, ctsp.max_gia_ban, ctsp.giam_gia\n" +
            "ORDER BY so_luong_ban DESC\n" +
            "LIMIT 20;", nativeQuery = true)
    List<Object[]> getTopSpBanChayForClient();

    @Query(value = "SELECT \n" +
            "    sp.id_sp,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_cl) as id_cl, \n" +
            "    GROUP_CONCAT(DISTINCT sp.id_loaisp) as id_loaisp,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_xx) as id_xx, \n" +
            "    GROUP_CONCAT(DISTINCT sp.id_tay_ao) as id_tay_ao,\n" +
            "    GROUP_CONCAT(DISTINCT sp.id_co_ao) as id_co_ao, \n" +
            "    GROUP_CONCAT(DISTINCT ct.id_size) as id_size,\n" +
            "    GROUP_CONCAT(DISTINCT ct.id_ms) as id_ms,\n" +
            "    \n" +
            "    sp.ten_sp,\n" +
            "    sp.trang_thai,\n" +
            "    (SELECT img.images FROM images img WHERE img.id_sp = sp.id_sp ORDER BY img.id_images LIMIT 1) AS first_image,\n" +
            "    ctsp.min_gia_ban,\n" +
            "    ctsp.max_gia_ban, \n" +
            "    ctsp.giam_gia\n" +
            "    \n" +
            "FROM san_pham sp\n" +
            "JOIN chi_tiet_san_pham ct ON sp.id_sp = ct.id_sp\n" +
            "LEFT JOIN (\n" +
            "  SELECT id_sp, \n" +
            "         MIN(gia_ban) as min_gia_ban, \n" +
            "         MAX(gia_ban) as max_gia_ban,\n" +
            "         MIN(gia_thuc_te) as giam_gia\n" +
            "  FROM chi_tiet_san_pham\n" +
            "  GROUP BY id_sp\n" +
            ") ctsp ON sp.id_sp = ctsp.id_sp\n" +
            "\n" +
            "WHERE (sp.trang_thai = 0 OR sp.trang_thai = 1) AND sp.id_loaisp =:idLsp AND sp.id_sp <>:idSp\n" +
            "\n" +
            "GROUP BY sp.id_sp, ctsp.min_gia_ban, ctsp.max_gia_ban, ctsp.giam_gia\n" +
            "LIMIT 8;\n", nativeQuery = true)
    List<Object[]> getRelatedProduct(@Param("idLsp") Integer idLsp, @Param("idSp") Integer idSp);

    @Query(value = "SELECT \n" +
            "    CASE\n" +
            "        WHEN COUNT(*) = SUM(CASE WHEN trang_thai = 10 THEN 1 ELSE 0 END) THEN true\n" +
            "        ELSE false\n" +
            "    END AS result\n" +
            "FROM chi_tiet_san_pham\n" +
            "WHERE id_sp =:idSp", nativeQuery = true)

    Integer setSpIsOut(@Param("idSp") Integer idSp);
}