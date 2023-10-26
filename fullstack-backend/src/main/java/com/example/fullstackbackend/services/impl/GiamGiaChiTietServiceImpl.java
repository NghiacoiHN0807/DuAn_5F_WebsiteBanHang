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
    @Transactional
    public void remove(Integer id) {
        GiamGiaChiTiet giamGiaChiTiet = getOne(id).orElseThrow();
        giamGiaChiTiet.setTrangThai(10);
        Integer idSp = giamGiaChiTiet.getIdSp().getIdSp();
        giamGiaChiTietRepository.updateCtsp("amount", BigDecimal.valueOf(0.0), idSp);
        giamGiaChiTietRepository.save(giamGiaChiTiet);
    }

    @Override
    public Integer findByIdGiamGia_IdGiamGia(Integer id) {
        return giamGiaChiTietRepository.findByIdGiamGia_IdGiamGia(id);
    }

    @Override
    @Transactional
    public void updateGiaThuc(Integer id) {
        BigDecimal gia = mucGiam(id);
        String type = typeGiam(id);
        giamGiaChiTietRepository.updateCtsp(String.valueOf(type), gia, id);
    }

    @Override
    public List<ChiTietSanPham> chiTietSanPhamList() {
        return giamGiaChiTietRepository.ctspGiamGia();
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
                giamGiaChiTiet.setIdGiamGia(giamGia1);
                giamGiaChiTiet.setIdSp(sanPham);
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
            Boolean exists = giamGiaChiTietRepository.existsByIdSp_IdSp(i);
            System.out.println("exists: "+ exists);
            if(exists) {
                GiamGiaChiTiet giamGiaChiTiet1 = new GiamGiaChiTiet();
                giamGiaChiTiet1.setIdGgct(id);
                SanPham sanPham = sanPhamService.detail(i).orElseThrow();
                giamGiaChiTiet1.setIdGiamGia(giamGia1);
                giamGiaChiTiet1.setIdSp(sanPham);
                giamGiaChiTietRepository.save(giamGiaChiTiet1);
                updateGiaThuc(i);
            } else {
                GiamGiaChiTiet giamGiaChiTiet2 = new GiamGiaChiTiet();
                SanPham sanPham = sanPhamService.detail(i).orElseThrow();
                giamGiaChiTiet2.setIdGiamGia(giamGia1);
                giamGiaChiTiet2.setIdSp(sanPham);
                System.out.println("sanPham: " + sanPham);
                giamGiaChiTietRepository.save(giamGiaChiTiet2);
                updateGiaThuc(i);
            }
        }
        return giamGia1;
    }
}