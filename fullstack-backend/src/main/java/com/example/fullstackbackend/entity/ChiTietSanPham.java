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
@Table(name = "chi_tiet_san_pham")
public class ChiTietSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ctsp")
    private Integer idCtsp;



    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_size", referencedColumnName = "id_size")
    private Size idSize;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_sp", referencedColumnName = "id_sp")
    private SanPham idSp;

    @Column(name = "trang_thai")
    private Integer trangThai;

}
