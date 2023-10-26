package com.example.fullstackbackend.DTO;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.entity.LoaiCoAo;
import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.entity.OngTayAo;
import com.example.fullstackbackend.entity.XuatXu;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
