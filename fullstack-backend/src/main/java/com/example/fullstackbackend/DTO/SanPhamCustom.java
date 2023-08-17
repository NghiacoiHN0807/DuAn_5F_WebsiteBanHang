package com.example.fullstackbackend.DTO;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.entity.LoaiCoAo;
import com.example.fullstackbackend.entity.MauSac;
import com.example.fullstackbackend.entity.OngTayAo;
import com.example.fullstackbackend.entity.XuatXu;
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

    private Integer idCl;

    private Integer idMs;

    private Integer idLsp;

    private Integer idXx;

    private Integer idTayAo;

    private Integer idCoAo;

    private String moTa;

    private BigDecimal giaBan;

    private Integer trangThai;

    private String url;

    private String size;
}
