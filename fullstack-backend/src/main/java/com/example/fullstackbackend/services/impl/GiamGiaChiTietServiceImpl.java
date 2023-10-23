package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.MucGiamDTO;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import com.example.fullstackbackend.repository.GiamGiaChiTietRepository;
import com.example.fullstackbackend.repository.GiamGiaRepository;
import com.example.fullstackbackend.services.ChitietsanphamService;
import com.example.fullstackbackend.services.GiamGiaChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class GiamGiaChiTietServiceImpl implements GiamGiaChiTietService {

    @Autowired
    private GiamGiaChiTietRepository giamGiaChiTietRepository;

    @Autowired
    private GiamGiaRepository giamGiaRepository;

    @Autowired
    private ChitietsanphamService chitietsanphamService;

    @Override
    public Page<GiamGiaChiTiet> getAll(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return giamGiaChiTietRepository.findAll(pageable);
    }

    @Override
    public Page<GiamGiaChiTiet> getAllByTrangThai(Integer pageNo, Integer size, Integer trangThai) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return giamGiaChiTietRepository.findAllByTrangThai(trangThai, pageable);
    }

    @Override
    public Page<GiamGiaChiTiet> getAllByDate(Integer pageNo, Integer size, LocalDate ngayBatDau, LocalDate ngayKetThuc) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return giamGiaChiTietRepository.findAllByDate(ngayBatDau, ngayKetThuc, pageable);
    }

    @Override
    public Optional<GiamGiaChiTiet> getOne(Integer id) {
        return giamGiaChiTietRepository.findById(id);
    }

    @Override
    public GiamGiaChiTiet add(GiamGiaChiTiet giamGiaChiTiet) {
        return giamGiaChiTietRepository.save(giamGiaChiTiet);
    }

    @Override
    public Object update(GiamGiaChiTiet giamGiaChiTiet, Integer id) {
        giamGiaChiTiet.setIdGgct(id);
        return giamGiaChiTietRepository.save(giamGiaChiTiet);
    }

    @Override
    public Boolean existsById(Integer id) {
        return giamGiaChiTietRepository.existsById(id);
    }

    @Override
    public void remove(Integer id) {
        GiamGiaChiTiet giamGiaChiTiet = getOne(id).orElseThrow();
        giamGiaChiTiet.setTrangThai(10);
        giamGiaChiTietRepository.save(giamGiaChiTiet);
    }

    @Override
    public Integer findByIdGiamGia_IdGiamGia(Integer id) {
        return giamGiaChiTietRepository.findByIdGiamGia_IdGiamGia(id);
    }

    @Override
    public ChiTietSanPham updateGiaThuc(BigDecimal gia, Integer id) {
        String type = typeGiam(id);
        ChiTietSanPham chiTietSanPham = giamGiaChiTietRepository.updateCtsp(type, gia, id);
        return chiTietSanPham;
    }

    @Override
    public List<ChiTietSanPham> chiTietSanPhamList() {
        return giamGiaChiTietRepository.ctspGiamGia();
    }

    @Override
    public String typeGiam(Integer idSp) {
        String check = giamGiaChiTietRepository.typeGiam(idSp);
        if (check.isEmpty()) {
            return "amount";
        }
        return "percentage";
    }

    @Override
    public BigDecimal mucGiam(Integer idSp) {
        MucGiamDTO mucGiamDTO = giamGiaChiTietRepository.mucGiam(idSp);
        if (mucGiamDTO.getMucGiamPhanTram() != null) {
            return mucGiamDTO.getMucGiamPhanTram();
        }
        return mucGiamDTO.getMucGiamTienMat();
    }
}