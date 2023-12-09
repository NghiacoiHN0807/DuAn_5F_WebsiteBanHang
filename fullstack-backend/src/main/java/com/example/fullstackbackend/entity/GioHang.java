package com.example.fullstackbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "gio_hang")
public class GioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_gio_hang")
    private Integer idGioHang;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_kh")
    private TaiKhoan idKh;

    @Column(name = "ma_gio_hang")
    private String maGioHang;

    @Column(name = "ngay_tao")
    private java.sql.Timestamp ngayTao;

    @Column(name = "ten_nguoi_nhan")
    private String tenNguoiNhan;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "trang_thai")
    private Integer trangThai;



    @PrePersist
    public void prePersist() {
        // Tạo mã tài khoản ngẫu nhiên không trùng nhau
        if (maGioHang == null) {
            maGioHang = generateMaGioHang();
        }

        // Tạo mật khẩu ngẫu nhiên nếu trường matKhau là null hoặc trống
        if (ngayTao == null) {
            ngayTao =  Timestamp.valueOf(LocalDateTime.now());
        }
    }

    private String generateMaGioHang() {
        // Tạo một UUID mới
        UUID uuid = UUID.randomUUID();

        // Chuyển UUID thành chuỗi và loại bỏ các ký tự '-'
        String uuidString = uuid.toString().replace("-", "");

        // Lấy 6 ký tự đầu của chuỗi UUID
        return "GH" + uuidString.toUpperCase().substring(0, 9);
    }


}
