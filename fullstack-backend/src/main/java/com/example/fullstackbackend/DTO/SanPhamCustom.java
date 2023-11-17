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
public class SanPhamCustom {

    private Integer idSp;

    private String maSp;

    private String tenSp;

    private String moTa;

    private Integer trangThai;

    private String url;

    private BigDecimal giaMin;

    private BigDecimal giaMax;
}
