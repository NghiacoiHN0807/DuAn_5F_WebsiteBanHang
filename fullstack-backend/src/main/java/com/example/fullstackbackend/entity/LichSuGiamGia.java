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

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "lich_su_giam_gia")
public class LichSuGiamGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idLsgg;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_hd", referencedColumnName = "id_hd")
    private HoaDon idHd;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ggct", referencedColumnName = "id_ggct")
    private GiamGiaChiTiet idGgct;

    @Column(name = "gia_ban_dau")
    private String giaBanDau;

    @Column(name = "gia_da_giam")
    private String giaDaGiam;

    @Column(name = "ngay_mua")
    private String ngayMua;

}
