package com.example.fullstackbackend.entity;


import jakarta.persistence.CascadeType;
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

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "chi_tiet_san_pham")
public class ChiTietSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ctsp")
    private Integer idCtsp;

    @Column(name = "ma_ctsp")
    private String maCtsp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_cl", referencedColumnName = "id_cl")
    private ChatLieu idCl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ms", referencedColumnName = "id_ms")
    private MauSac idMs;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_size", referencedColumnName = "id_size")
    private Size idSize;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_sp", referencedColumnName = "id_sp")
    private SanPham idSp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_lsp", referencedColumnName = "id_loaisp")
    private LoaiSp idLsp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_xx", referencedColumnName = "id_xx")
    private XuatXu idXx;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tay_ao", referencedColumnName = "id_tay_ao")
    private OngTayAo idTayAo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_co_ao", referencedColumnName = "id_co_ao")
    private LoaiCoAo idLoaiCoAo;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "so_luong_ton")
    private Integer soLuongTon;

    @Column(name = "gia_nhap")
    private BigDecimal giaNhap;

    @Column(name = "gia_ban")
    private BigDecimal giaBan;

    @Column(name = "trang_thai")
    private Integer trangThai;

}
