package com.example.fullstackbackend.DTO;

import com.example.fullstackbackend.entity.HoaDon;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CouponsDTO {

    private HoaDon hoaDon;

    private String code;

    private Integer phanTramGiam;

}
