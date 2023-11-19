package com.example.fullstackbackend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "coupons")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Coupons {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer idCoupon;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "thoi_gian_ket_thuc")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Instant thoiGianKetThuc;

    @Column(name = "so_luong")
    private Integer soLuong;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hoa_don", referencedColumnName = "id_hd")
    private HoaDon hoaDon;

    @Column(name = "discount")
    private BigDecimal tienMat;

    @Column(name = "discount_percentage")
    private Integer phanTram;

    @Column(name = "max_discount")
    private BigDecimal tienToiThieu;

    @Column(name = "so_luong_hien_tai")
    private Integer soLuongHienTai;

    @Column(name = "thoi_gian_tao")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Instant thoiGianTao;

    @Column(name = "thoi_gian_sua")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Instant thoiGianSua;

    @Column(name = "trang_thai")
    private Integer trangThai = 0;

}
