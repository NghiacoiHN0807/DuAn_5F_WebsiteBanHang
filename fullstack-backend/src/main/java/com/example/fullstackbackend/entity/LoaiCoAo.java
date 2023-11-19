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
@Table(name = "loai_co_ao")
public class LoaiCoAo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_co_ao")
    private Integer idCoAo;

    @Column(name = "ma_co_ao")
    private String maCoAo;

    @Column(name = "loai_co_ao")
    private String loaiCoAo;

    @Column(name = "trang_thai")
    private Integer trangThai;
}
