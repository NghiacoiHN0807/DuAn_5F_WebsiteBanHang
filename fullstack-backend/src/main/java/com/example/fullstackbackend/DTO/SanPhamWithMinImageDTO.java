package com.example.fullstackbackend.DTO;

import com.example.fullstackbackend.entity.SanPham;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SanPhamWithMinImageDTO {
    private SanPham sanPham;
    private String url_image;
}
