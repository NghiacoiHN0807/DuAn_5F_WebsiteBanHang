package com.example.fullstackbackend.services;

import com.example.fullstackbackend.DTO.LichSuHoaDonDTO;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.entity.XuatXu;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface LichSuHoaDonService {

    List<LichSuHoaDonDTO> getAll(Integer id);

    LichSuHoaDon add(LichSuHoaDon add);

}
