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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

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
    private LocalDate ngayTao;

    @Column(name = "ngay_thanh_toan")
    private LocalDate ngayThanhToan;

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

    @Column(name = "sdt_kh")
    private String sdtKh;

    @Column(name = "ten_ship")
    private String tenShip;

    @Column(name = "sdt_ship")
    private String sdtShip;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "ngay_du_tinh_nhan")
    private LocalDate ngayDuTinhNhan;

    @Column(name = "ngay_bat_dau_giao")
    private LocalDate ngayBatDauGiao;

    @Column(name = "ngay_giao_thanh_cong")
    private LocalDate ngayGiaoThanhCong;

    @Column(name = "kieu_hoa_don")
    private Integer kieuHoaDon;

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
