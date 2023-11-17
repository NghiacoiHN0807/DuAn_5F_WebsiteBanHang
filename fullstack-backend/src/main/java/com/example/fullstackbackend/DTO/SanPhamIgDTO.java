package com.example.fullstackbackend.DTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SanPhamIgDTO {

    private Integer idSp;

    private String maSp;

    private String tenSp;

    private Integer idCl;

    private Integer idLsp;

    private Integer idXx;

    private Integer idTayAo;

    private Integer idCoAo;

    private String moTa;

    private BigDecimal giaSmall;

    private BigDecimal giaBig;

    private Integer trangThai;

}
