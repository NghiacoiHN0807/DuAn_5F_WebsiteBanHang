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
    Integer idSp;

    String maSp;

    String tenSp;

    String tenSize;

    String url_image;

    String tenChuongTrinh;

    BigDecimal mucGiamPhanTram;

    BigDecimal mucGiamTienMat;

    Integer idGgct;

    Integer idCtsp;

    Integer idGiamGia;

    BigDecimal donGia;

    BigDecimal soTienConLai;

    Integer trangThai;

    Timestamp ngayBatDau;

    Timestamp ngayKetThuc;
}
