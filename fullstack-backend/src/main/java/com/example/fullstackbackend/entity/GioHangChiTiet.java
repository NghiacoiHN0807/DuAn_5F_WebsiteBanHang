package com.example.fullstackbackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "gio_hang_chi_tiet")
public class GioHangChiTiet {
    @Id
    @Column(name = "id_ghct")
    private Integer idGhct;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_gh", referencedColumnName = "id_gh")
    private GioHang idGh;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ctsp", referencedColumnName = "id_ctsp")
    private ChiTietSanPham idCtsp;


    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "don_gia")
    private BigDecimal donGia;

    @Column(name = "don_gia_sau_giam")
    private BigDecimal donGiaSauGiam;

    @Column(name = "trang_thai")
    private Integer trangThai;

}
