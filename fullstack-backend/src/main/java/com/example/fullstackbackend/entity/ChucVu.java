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
@Table(name = "chuc_vu")
public class ChucVu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cv")
    private Integer idCv;

    @Column(name = "ma_cv")
    private String maCv;

    @Column(name = "ten_cv")
    private String tenCv;

    @Column(name = "ngay_tao")
    private java.sql.Date ngayTao;

    @Column(name = "trang_thai")
    private Integer trangThai;

}
