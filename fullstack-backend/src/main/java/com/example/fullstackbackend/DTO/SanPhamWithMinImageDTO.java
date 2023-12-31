package com.example.fullstackbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SanPhamWithMinImageDTO {
    private SanPhamIgDTO sanPham;
    private String url_image;
}
