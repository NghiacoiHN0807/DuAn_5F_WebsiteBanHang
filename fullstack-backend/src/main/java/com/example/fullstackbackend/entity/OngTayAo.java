package com.example.fullstackbackend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "ong_tay_ao")
public class OngTayAo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tay_ao")
    private Integer idTayAo;

    @Column(name = "ma_tay_ao")
    private String maTayAo;

    @Column(name = "loai_tay_ao")
    private String loaiTayAo;

    @Column(name = "trang_thai")
    private Integer trangThai;

}
