package com.example.fullstackbackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "dia_chi")
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dia_chi", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_tai_khoan", referencedColumnName = "ma_tai_khoan")
    private TaiKhoan taiKhoan;

    @Size(max = 255)
    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    @Column(name = "loai_dia_chi")
    private Integer loaiDiaChi;

    @Size(max = 255)
    @Column(name = "phuong_xa")
    private String phuongXa;

    @Size(max = 255)
    @Column(name = "quan_huyen")
    private String quanHuyen;

    @Size(max = 255)
    @Column(name = "sdt")
    private String sdt;

    @Size(max = 255)
    @Column(name = "ten_nguoi_nhan")
    private String tenNguoiNhan;

    @Size(max = 255)
    @Column(name = "tinh_thanh")
    private String tinhThanh;

    @Column(name = "trang_thai")
    private Integer trangThai;

}