package com.example.fullstackbackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
@Table(name = "hoa_don")
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hd")
    private Integer idHd;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tai_khoan", referencedColumnName = "id_tai_khoan")
    private TaiKhoan idTK;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_khach_hang", referencedColumnName = "id_tai_khoan")
    private TaiKhoan idKH;

    @Column(name = "ma_hd")
    private String maHd;

    @Column(name = "ngay_tao")
    private Timestamp ngayTao;

    @Column(name = "ngay_thanh_toan")
    private Timestamp ngayThanhToan;

    @Column(name = "so_tien_giam_gia")
    private BigDecimal soTienGiamGia;

    @Column(name = "thanh_tien")
    private BigDecimal thanhTien;

    @Column(name = "tien_dua")
    private BigDecimal tienDua;

    @Column(name = "tien_thua")
    private BigDecimal tienThua;

    @Column(name = "tien_ship")
    private BigDecimal tienShip;

    @Column(name = "tong_tien")
    private BigDecimal tongTien;

    @Column(name = "ten_kh")
    private String tenKh;

    @Size(min = 10, max = 11, message = "Số Điện Thoại Tối Thiểu 10 Số")
    @Pattern(message = "Nhập số Điện Thoại Chưa Đúng", regexp = "^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$")
    @Column(name = "sdt_kh")
    private String sdtKh;

    @Column(name = "ten_ship")
    private String tenShip;

    @Size(min = 10, max = 11, message = "Số Điện Thoại Tối Thiểu 10 Số")
    @Pattern(message = "Nhập số Điện Thoại Chưa Đúng", regexp = "^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$")
    @Column(name = "sdt_ship")
    private String sdtShip;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "ma_giam_gia")
    private String maGiamGia;

    @Column(name = "ngay_du_tinh_nhan")
    private Timestamp ngayDuTinhNhan;

    @Column(name = "ngay_bat_dau_giao")
    private Timestamp ngayBatDauGiao;

    @Column(name = "ngay_giao_thanh_cong")
    private Timestamp ngayGiaoThanhCong;

//    @NotNull(message = "Không Được Để Trống")
    @Column(name = "kieu_hoa_don")
    private Integer kieuHoaDon;

    @NotNull(message = "Không Được Để Trống")
    @Column(name = "trang_thai")
    private Integer trangThai;

    public HoaDon(Integer idHd) {
        this.idHd = idHd;
    }

    public Integer getIdHd() {
        return idHd;
    }

    public void setIdHd(Integer idHd) {
        this.idHd = idHd;
    }
}