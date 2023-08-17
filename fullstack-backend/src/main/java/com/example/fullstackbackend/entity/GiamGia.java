package com.example.fullstackbackend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "giam_gia")
public class GiamGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_giam_gia")
    private Integer idGiamGia;

    @Column(name = "ma_giam_gia")
    private String maGiamGia;

    @Column(name = "ten_chuong_trinh")
    private String tenChuongTrinh;

    @Column(name = "ngay_bat_dau")
    Timestamp ngayBatDau;

    @Column(name = "ngay_ket_thuc")
    Timestamp ngayKetThuc;

    @Column(name = "muc_giam_phan_tram")
    private BigDecimal mucGiamPhanTram;

    @Column(name = "muc_giam_tien_mat")
    private BigDecimal mucGiamTienMat;

    @Column(name = "trang_thai")
    private Integer trangThai;

}
