package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.SanPhamCustom;
import com.example.fullstackbackend.DTO.SanPhamDTO;
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
    public Page<SanPham> getAll(Integer pageNo, Integer limit, Integer tinhTrang) {
        Pageable pageable = PageRequest.of(pageNo, limit);
        return sanphamRepository.findAllByTinhTrang(tinhTrang, pageable);
    }
    public List<SanPham> getAll() {
        return sanphamRepository.findAll();
    }

    @Override
    public Page<SanPham> sanPhamPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return sanphamRepository.findAll(pageable);
    }

    @Override
    public Page<SanPhamCustom> sanPhamCustom(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        Page<Object[]> result = sanphamRepository.getSpWithImg(pageable);

        List<SanPhamCustom> dtos = new ArrayList<>();
        for (Object[] row : result.getContent()) {
            SanPhamCustom spCustom = new SanPhamCustom();
            spCustom.setIdSp((Integer) row[0]);
            spCustom.setMaSp((String) row[1]);
            spCustom.setTenSp((String) row[2]);
            spCustom.setIdCl((Integer) row[3]);
            spCustom.setIdMs((Integer) row[4]);
            spCustom.setIdLsp((Integer) row[5]);
            spCustom.setIdXx((Integer) row[6]);
            spCustom.setIdTayAo((Integer) row[7]);
            spCustom.setIdCoAo((Integer) row[8]);
            spCustom.setMoTa((String) row[9]);
            spCustom.setGiaBan((BigDecimal) row[10]);
            spCustom.setTrangThai((Integer) row[11]);
            spCustom.setUrl((String) row[12]);
            spCustom.setSize((String) row[13]);
            dtos.add(spCustom);
        }

        return new PageImpl<>(dtos, pageable, result.getTotalElements());
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
        return null;
    }

    @Override
    public List<SanPhamDTO> getSanPhamDetails() {
        List<Object[]> result = sanphamRepository.getSanPhamDetails();

        List<SanPhamDTO> dtos = new ArrayList<>();

        for (Object[] row : result) {
            SanPhamDTO sanPhamDTO = new SanPhamDTO();
            sanPhamDTO.setIdSp((Integer) row[0]);
            sanPhamDTO.setMaSp((String) row[1]);
            sanPhamDTO.setTenSp((String) row[2]);
            sanPhamDTO.setTenChuongTrinh((String) row[3]);
            sanPhamDTO.setMucGiamPhanTram((BigDecimal) row[4]);
            sanPhamDTO.setMucGiamTienMat((BigDecimal) row[5]);
            sanPhamDTO.setUrlImage((String) row[6]);
            sanPhamDTO.setIdGgct((Integer) row[7]);
            sanPhamDTO.setIdGiamGia((Integer) row[8]);
            sanPhamDTO.setNgayBatDau((Timestamp) row[9]);
            sanPhamDTO.setNgayKetThuc((Timestamp) row[10]);
            sanPhamDTO.setGiaBanMin((BigDecimal) row[11]);
            sanPhamDTO.setGiaBanMax((BigDecimal) row[12]);
            sanPhamDTO.setGiaThucTeMin((BigDecimal) row[13]);
            sanPhamDTO.setGiaThucTeMax((BigDecimal) row[14]);
            sanPhamDTO.setTrangThai((Integer) row[15]);

            dtos.add(sanPhamDTO);
        }

        return dtos;
    }

    @Override
    public List<Object[]> topSptrend() {
        return sanphamRepository.topSptrending();
    }


}
