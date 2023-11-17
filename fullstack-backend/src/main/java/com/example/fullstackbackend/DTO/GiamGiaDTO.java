package com.example.fullstackbackend.DTO;

import com.example.fullstackbackend.entity.GiamGia;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GiamGiaDTO {

    private GiamGia giamGia;

    private List<Integer> idSp;

}
