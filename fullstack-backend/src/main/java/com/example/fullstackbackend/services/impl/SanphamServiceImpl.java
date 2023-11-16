package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.SanPhamClientDTO;
import com.example.fullstackbackend.DTO.SanPhamCustom;
import com.example.fullstackbackend.DTO.SanPhamDTO;;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.SanphamRepository;
import com.example.fullstackbackend.services.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SanphamServiceImpl implements SanPhamService {

    @Autowired
    private SanphamRepository sanphamRepository;

    @Override
    public List<SanPham> getAll() {
        return sanphamRepository.findAll();
    }

    @Override
    public Page<SanPham> sanPhamPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return sanphamRepository.findAll(pageable);
    }

    @Override
    public List<SanPhamCustom> sanPhamCustom() {
        List<SanPhamCustom> dtos = new ArrayList<>();
        for (Object[] row : sanphamRepository.getSpWithImg()) {
            SanPhamCustom spCustom = new SanPhamCustom();
            spCustom.setIdSp((Integer) row[0]);
            spCustom.setMaSp((String) row[1]);
            spCustom.setTenSp((String) row[2]);
            spCustom.setMoTa((String) row[3]);
            spCustom.setTrangThai((Integer) row[4]);
            spCustom.setUrl((String) row[5]);
            spCustom.setGiaMin((BigDecimal) row[6]);
            spCustom.setGiaMax((BigDecimal) row[7]);
            dtos.add(spCustom);
        }

        return dtos;
    }

    @Override
    public List<SanPhamClientDTO> sanPhamForClient() {
        List<SanPhamClientDTO> dtos = new ArrayList<>();
        for (Object[] row : sanphamRepository.getSpForClient()) {
            SanPhamClientDTO spCustom = new SanPhamClientDTO();
            spCustom.setTenSp((String) row[0]);
            spCustom.setTrangThai((Integer) row[1]);
            spCustom.setUrl((String) row[2]);
            spCustom.setGiaMin((BigDecimal) row[3]);
            spCustom.setGiaMax((BigDecimal) row[4]);
            spCustom.setGiaThucTe((BigDecimal) row[5]);
            dtos.add(spCustom);
        }

        return dtos;
    }

    @Override
    public SanPham add(SanPham add) {
        return sanphamRepository.save(add);
    }

    @Override
    public SanPham delete(Integer id) {
        SanPham sp = sanphamRepository.findById(id).orElse(null);
        if (sp.getTrangThai() == 0) {
            sp.setTrangThai(10);
        }
        return sanphamRepository.save(sp);
    }

    @Override
    public SanPham update(SanPham update) {
        return sanphamRepository.save(update);
    }

    @Override
    public Optional<SanPham> detail(Integer id) {
        return sanphamRepository.findById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return sanphamRepository.existsById(id);
    }

    @Override
    public List<Object[]> getSanPhamWithMinImageUrl() {
        return sanphamRepository.getSanPhamWithMinImageUrl();
    }

    @Override
    public Page<SanPhamDTO> getSanPhamDetails(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        Page<Object[]> result = sanphamRepository.getSanPhamDetails(pageable);

        List<SanPhamDTO> dtos = new ArrayList<>();

        for (Object[] row : result.getContent()) {
            SanPhamDTO sanPhamDTO = new SanPhamDTO();
            sanPhamDTO.setIdSp((Integer) row[0]);
            sanPhamDTO.setMaSp((String) row[1]);
            sanPhamDTO.setTenSp((String) row[2]);
            sanPhamDTO.setTenSize((String) row[3]);
            sanPhamDTO.setUrl_image((String) row[4]);
            sanPhamDTO.setTenChuongTrinh((String) row[5]);
            sanPhamDTO.setMucGiamPhanTram((BigDecimal) row[6]);
            sanPhamDTO.setMucGiamTienMat((BigDecimal) row[7]);
            sanPhamDTO.setIdGgct((Integer) row[8]);
            sanPhamDTO.setIdCtsp((Integer) row[9]);
            sanPhamDTO.setIdGiamGia((Integer) row[10]);
            sanPhamDTO.setDonGia((BigDecimal) row[11]);
            sanPhamDTO.setSoTienConLai((BigDecimal) row[12]);
            sanPhamDTO.setTrangThai((Integer) row[13]);
            sanPhamDTO.setNgayBatDau((Timestamp) row[14]);
            sanPhamDTO.setNgayKetThuc((Timestamp) row[15]);

            dtos.add(sanPhamDTO);
        }

        return new PageImpl<>(dtos, pageable, result.getTotalElements());
    }

}
