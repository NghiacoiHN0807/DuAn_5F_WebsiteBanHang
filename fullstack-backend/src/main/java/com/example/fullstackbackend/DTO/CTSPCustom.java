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
public class CTSPCustom {

    private Integer idCtsp;

    private String tenMs;

    private String tenSize;

    private BigDecimal giaNhap;

    private BigDecimal giaBan;

    private Integer soLuongTon;

    private Integer trangThai;

}
