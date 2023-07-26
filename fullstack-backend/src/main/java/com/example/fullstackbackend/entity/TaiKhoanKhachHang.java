package com.example.fullstackbackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tai_khoan")
<<<<<<<< HEAD:fullstack-backend/src/main/java/com/example/fullstackbackend/entity/TaiKhoanNhanVien.java
public class TaiKhoanNhanVien {
========

public class TaiKhoanKhachHang {
>>>>>>>> origin/nhanh_khach_hang_By_Phuc:fullstack-backend/src/main/java/com/example/fullstackbackend/entity/TaiKhoanKhachHang.java
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tai_khoan")
    private Integer idTaiKhoan;

<<<<<<<< HEAD:fullstack-backend/src/main/java/com/example/fullstackbackend/entity/TaiKhoanNhanVien.java
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_chuc_vu", referencedColumnName = "id_cv")
    private ChucVu idChucVu;

    @Column(name = "ma_tai_khoan")
========
    @Column(name = "ma_tai_khoan", unique = true)
>>>>>>>> origin/nhanh_khach_hang_By_Phuc:fullstack-backend/src/main/java/com/example/fullstackbackend/entity/TaiKhoanKhachHang.java
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

