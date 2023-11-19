package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.LichSuHoaDonDTO;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.repository.LichSuHoaDonRepository;
import com.example.fullstackbackend.services.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LichSuHoaDonServiceImpl implements LichSuHoaDonService {
    @Autowired
    private LichSuHoaDonRepository lichSuHoaDonRepository;

    @Override
    public List<LichSuHoaDonDTO> getAll(Integer id) {
        List<LichSuHoaDon> lichSuHoaDons = lichSuHoaDonRepository.finByIdHd(id);

        List<LichSuHoaDonDTO> lichSuHoaDonDTOs = lichSuHoaDons.stream().map(lichSuHoaDon -> new LichSuHoaDonDTO(
                lichSuHoaDon.getIdLshd(),
                lichSuHoaDon.getIdHd(),
                lichSuHoaDon.getIdTk(),
                lichSuHoaDon.getTrangThai(),
                lichSuHoaDon.getMoTa(),
                lichSuHoaDon.getNgayThayDoi()
        )).collect(Collectors.toList());
        return lichSuHoaDonDTOs;
    }

    @Override
    public LichSuHoaDon add(LichSuHoaDon add) {
        return lichSuHoaDonRepository.save(add);
    }
}
