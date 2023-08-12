package com.example.fullstackbackend.DTO;

import com.example.fullstackbackend.entity.GiamGia;

import java.util.List;

public class GiamGiaWithSanPhamDTO {
    private GiamGia giamGia; // Thông tin GiamGia
    private List<GiamGiaChiTietDTO> sanPhamList; // Danh sách SanPham
}

