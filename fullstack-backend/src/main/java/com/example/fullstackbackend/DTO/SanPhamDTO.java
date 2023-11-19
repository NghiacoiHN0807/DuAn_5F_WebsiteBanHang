package com.example.fullstackbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SanPhamDTO {
    private Integer idSp;

    private String maSp;

    private String tenSp;

    private String urlImage;

    private String tenChuongTrinh;

    private BigDecimal mucGiamPhanTram;

    private BigDecimal mucGiamTienMat;

    private Integer idGgct;

    private Integer idGiamGia;

    private BigDecimal giaBanMin;

    private BigDecimal giaBanMax;

    private BigDecimal giaThucTeMin;

    private BigDecimal giaThucTeMax;

    private Integer trangThai;

    private Timestamp ngayBatDau;

    private Timestamp ngayKetThuc;
}
