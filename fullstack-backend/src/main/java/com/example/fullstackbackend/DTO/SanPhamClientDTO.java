package com.example.fullstackbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SanPhamClientDTO {

    private Integer idSp;

    private String chatLieus;

    private String loaiSPs;

    private String xuatXus;

    private String tayAos;

    private String coAos;

    private String sizes;

    private String mauSacs;

    private String tenSp;

    private Integer trangThai;

    private String url;

    private BigDecimal giaMin;

    private BigDecimal giaMax;

    private BigDecimal giaThucTe;

    private BigDecimal maxThucTe;

    private BigDecimal soLuongBan;

}
