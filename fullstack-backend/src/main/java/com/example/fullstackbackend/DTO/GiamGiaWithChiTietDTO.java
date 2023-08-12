package com.example.fullstackbackend.DTO;

import com.example.fullstackbackend.entity.GiamGia;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GiamGiaWithChiTietDTO {
    private GiamGia giamGia;
    private List<GiamGiaChiTietDTO> chiTietList;
}
