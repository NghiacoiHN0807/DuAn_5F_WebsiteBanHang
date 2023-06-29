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
@Table(name = "images")
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idImages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ctsp", referencedColumnName = "id_ctsp")
    private ChiTietSanPham idCtsp;

    @Column(name = "images")
    private String images;

    @Column(name = "trang_thai")
    private Integer trangThai;

}
