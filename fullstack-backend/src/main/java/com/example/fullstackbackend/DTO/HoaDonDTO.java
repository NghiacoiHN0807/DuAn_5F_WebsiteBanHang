package com.example.fullstackbackend.DTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class HoaDonDTO {
    private Integer idHd;
    private String maHd;
    private LocalDate ngayTao;
    private LocalDate ngayThanhToan;
    private BigDecimal soTienGiamGia;
    private BigDecimal thanhTien;
    private BigDecimal tienDua;
    private BigDecimal tienThua;
    private BigDecimal tienShip;
    private BigDecimal tongTien;
    private String tenKh;
    private String sdtKh;
    private String tenShip;
    private String sdtShip;
    private String diaChi;
    private LocalDate ngayDuTinhNhan;
    private LocalDate ngayBatDauGiao;
    private LocalDate ngayGiaoThanhCong;
    private Integer kieuHoaDon;
    private Integer trangThai;
}
