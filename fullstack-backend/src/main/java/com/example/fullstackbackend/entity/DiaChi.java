package com.example.fullstackbackend.entity;

<<<<<<< HEAD

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

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
=======
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.CodePointLength;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
>>>>>>> main
@Table(name = "dia_chi")
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
    @Column(name = "id_dia_chi")
    private Integer idDiaChi;

    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    @Column(name = "phuong_xa")
    private String phuongXa;

    @Column(name = "quan_huyen")
    private String quanHuyen;

    @Column(name = "tinh_thanh")
    private String tinhThanh;

    @Column(name = "loai_dia_chi")
    private Integer loaiDiaChi;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "ten_nguoi_nhan")
    private String tenNguoiNhan;

    @Column(name = "trang_thai")
    private Integer trangThai;

}
=======
    @Column(name = "id_dia_chi", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tai_khoan")
    private TaiKhoan taiKhoan;


    @NotEmpty(message = "Không Được Để Trống Địa Chỉ")
    @Size(message = "Không Được Để Trống", max = 255)
    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    @Column(name = "loai_dia_chi")
    private Integer loaiDiaChi;

    @Size(max = 255)
    @Column(name = "phuong_xa")
    private String phuongXa;


    @NotEmpty(message = "Chưa Chọn Quận Huyện")
    @NotNull(message = "Chưa Chọn Quận Huyện")
    @Size(max = 255)
    @Column(name = "quan_huyen")
    private String quanHuyen;

    @Pattern(message = "Nhập số Điện Thoại Chưa Đúng", regexp = "^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$")
    @NotEmpty(message = "Không Được Để Trống Số Điện Thoại")
    @Size(min = 10,max = 10,message = "Số Điện Thoại Tối Thiểu 10 Số")
    @Column(name = "sdt")
    private String sdt;

    @NotEmpty(message = "Không Được Để Trống Tên Người Nhận")
    @Size(max = 255)
    @Column(name = "ten_nguoi_nhan")
    private String tenNguoiNhan;

    @NotEmpty(message = "Chưa Chọn Tỉnh Thành")
    @NotNull(message = "Chưa Chọn Tỉnh Thành")
    @Size(max = 255)
    @Column(name = "tinh_thanh")
    private String tinhThanh;

    @Column(name = "trang_thai")
    private Integer trangThai;


}
>>>>>>> main
