package com.example.fullstackbackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class TaiKhoanKhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tai_khoan")
    private Integer idTaiKhoan;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_chuc_vu", referencedColumnName = "id_cv")
    private ChucVu idChucVu;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_dia_chi", referencedColumnName = "id_dia_chi")
    private DiaChi idDC;

    @Column(name = "ma_tai_khoan")
    private String maTaiKhoan;

    @Column(name = "ho")
    private String ho;

    @Column(name = "ten")
    private String ten;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "email")
    private String email;

    @Column(name = "mat_khau")
    private String matKhau;

    @Column(name = "trang_thai")
    private Integer trangThai;
}
