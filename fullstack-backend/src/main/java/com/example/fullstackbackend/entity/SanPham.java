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

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "san_pham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sp")
    private Integer idSp;

    @Column(name = "ma_sp")
    private String maSp;

    @Column(name = "ten_sp")
    private String tenSp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_cl", referencedColumnName = "id_cl")
    private ChatLieu idCl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_loaisp", referencedColumnName = "id_loaisp")
    private LoaiSp idLsp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_xx", referencedColumnName = "id_xx")
    private XuatXu idXx;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tay_ao", referencedColumnName = "id_tay_ao")
    private OngTayAo idTayAo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_co_ao", referencedColumnName = "id_co_ao")
    private LoaiCoAo idCoAo;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "trang_thai")
    private Integer trangThai;

}
