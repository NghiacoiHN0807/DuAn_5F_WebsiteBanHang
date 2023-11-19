package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.GiamGiaDTO;
import com.example.fullstackbackend.DTO.MucGiamDTO;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GiamGia;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.GiamGiaChiTietRepository;
import com.example.fullstackbackend.repository.SanphamRepository;
import com.example.fullstackbackend.services.ChitietsanphamService;
import com.example.fullstackbackend.services.GiamGiaChiTietService;
import com.example.fullstackbackend.services.GiamGiaService;
import com.example.fullstackbackend.services.SanPhamService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class GiamGiaChiTietServiceImpl implements GiamGiaChiTietService {

    @Autowired
    private GiamGiaChiTietRepository giamGiaChiTietRepository;

    @Autowired
    private SanphamRepository sanphamRepository;

    @Autowired
    private GiamGiaService giamGiaService;

    @Autowired
    private SanPhamService sanPhamService;

    @Override
    public List<GiamGiaChiTiet> getAll() {
        return giamGiaChiTietRepository.findAll();
    }

    @Override
    public List<GiamGiaChiTiet> getAllByTrangThai(Integer trangThai) {
        return giamGiaChiTietRepository.findAllByTrangThai(trangThai);
    }

    @Override
    public List<GiamGiaChiTiet> getAllByDate(LocalDate ngayBatDau, LocalDate ngayKetThuc) {
        return giamGiaChiTietRepository.findAllByDate(ngayBatDau, ngayKetThuc);
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
    @Transactional
    public void remove(Integer id) {
        GiamGiaChiTiet giamGiaChiTiet = getOne(id).orElseThrow();
        GiamGia giamGia = giamGiaService.getOne(giamGiaChiTiet.getIdGiamGia().getIdGiamGia()).orElseThrow();
        giamGia.setTrangThai(10);
        giamGiaChiTiet.setTrangThai(10);
        Integer idSp = giamGiaChiTiet.getIdSp().getIdSp();
        SanPham sanPham = sanPhamService.detail(idSp).orElseThrow();
        sanPham.setTrangThai(0);
        sanPhamService.add(sanPham);
        giamGiaService.add(giamGia);
        giamGiaChiTietRepository.updateCtsp("amount", BigDecimal.valueOf(0.0), idSp);
        giamGiaChiTietRepository.save(giamGiaChiTiet);
    }

    @Override
    @Transactional
    public void updateGiaThuc(Integer id) {
        BigDecimal gia = mucGiam(id);
        String type = typeGiam(id);
        giamGiaChiTietRepository.updateCtsp(String.valueOf(type), gia, id);
    }

    @Override
    public String typeGiam(Integer idSp) {
        List<Object[]> result = giamGiaChiTietRepository.mucGiam(idSp);

        if (!result.isEmpty()) {
            for (Object[] row : result) {
                BigDecimal mucGiamPhanTram = (BigDecimal) row[0];
                BigDecimal mucGiamTienMat = (BigDecimal) row[1];

                if (mucGiamPhanTram != null) {
                    return "percentage";
                }
                return "amount";
            }
        }

        return null;
    }

    @Override
    public BigDecimal mucGiam(Integer idSp) {
        List<Object[]> result = giamGiaChiTietRepository.mucGiam(idSp);

        if (!result.isEmpty()) {
            for (Object[] row : result) {
                BigDecimal mucGiamPhanTram = (BigDecimal) row[0];
                BigDecimal mucGiamTienMat = (BigDecimal) row[1];

                if (mucGiamPhanTram != null) {
                    return mucGiamPhanTram;
                }
                return mucGiamTienMat;
            }
        }

        return BigDecimal.ZERO; // Or handle the case where the result is unexpected.
    }

    @Override
    @Transactional
    public GiamGia insert(GiamGiaDTO giamGiaDTO) {

        GiamGia giamGia1 = (GiamGia) giamGiaService.add(giamGiaDTO.getGiamGia());
        List<Integer> idSp = giamGiaDTO.getIdSp();
        for (Integer i: idSp) {
            Boolean exists = sanphamRepository.existsById(i);
            if(exists) {
                giamGiaChiTietRepository.deleteGgctByidSp(Integer.valueOf(i));
                GiamGiaChiTiet giamGiaChiTiet = new GiamGiaChiTiet();
                SanPham sanPham = sanPhamService.detail(i).orElseThrow();
                sanPham.setTrangThai(2);
                giamGiaChiTiet.setIdGiamGia(giamGia1);
                giamGiaChiTiet.setIdSp(sanPham);
                sanPhamService.add(sanPham);
                giamGiaChiTietRepository.save(giamGiaChiTiet);
                updateGiaThuc(i);
            } else {
                GiamGiaChiTiet giamGiaChiTiet = new GiamGiaChiTiet();
                SanPham sanPham = sanPhamService.detail(i).orElseThrow();
                giamGiaChiTiet.setIdGiamGia(giamGia1);
                giamGiaChiTiet.setIdSp(sanPham);
                giamGiaChiTietRepository.save(giamGiaChiTiet);
                updateGiaThuc(i);
            }
        }
        return giamGia1;
    }

    @Override
    @Transactional
    public GiamGia updateDto(GiamGiaDTO giamGiaDTO, Integer id) {
        GiamGiaChiTiet giamGiaChiTiet = giamGiaChiTietRepository.findById(id).orElseThrow();
        giamGiaDTO.getGiamGia().setIdGiamGia(giamGiaChiTiet.getIdGiamGia().getIdGiamGia());
        GiamGia giamGia1 = (GiamGia) giamGiaService.add(giamGiaDTO.getGiamGia());
        List<Integer> idSp = giamGiaDTO.getIdSp();
        for (Integer i: idSp) {
            Integer exists = giamGiaChiTietRepository.existsByIdSp_IdSp(i);
            System.out.println("exists: "+ exists);
            if(exists >= 1) {
                GiamGiaChiTiet giamGiaChiTiet1 = new GiamGiaChiTiet();
                giamGiaChiTiet1.setIdGgct(id);
                SanPham sanPham = sanPhamService.detail(i).orElseThrow();
                sanPham.setTrangThai(2);
                giamGiaChiTiet1.setIdGiamGia(giamGia1);
                giamGiaChiTiet1.setIdSp(sanPham);
                sanPhamService.add(sanPham);
                giamGiaChiTietRepository.save(giamGiaChiTiet1);
                updateGiaThuc(i);
            } else {
                GiamGiaChiTiet giamGiaChiTiet2 = new GiamGiaChiTiet();
                SanPham sanPham = sanPhamService.detail(i).orElseThrow();
                giamGiaChiTiet2.setIdGiamGia(giamGia1);
                giamGiaChiTiet2.setIdSp(sanPham);
                giamGiaChiTietRepository.save(giamGiaChiTiet2);
                updateGiaThuc(i);
            }
        }
        return giamGia1;
    }
}