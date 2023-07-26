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
@Table(name = "giam_gia_chi_tiet")
public class GiamGiaChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ggct")
    private Integer idGgct;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ctsp", referencedColumnName = "id_ctsp")
    private ChiTietSanPham idCtsp;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_giam_gia", referencedColumnName = "id_giam_gia")
    private GiamGia idGiamGia;

    @Column(name = "don_gia")
    private BigDecimal donGia;

    @Column(name = "so_tien_con_lai")
    private BigDecimal soTienConLai;

    @Column(name = "trang_thai")
    private Integer trangThai;
}
