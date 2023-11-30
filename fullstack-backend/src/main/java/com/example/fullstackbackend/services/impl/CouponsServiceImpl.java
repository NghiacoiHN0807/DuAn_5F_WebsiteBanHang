package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.CouponsDTO;
import com.example.fullstackbackend.entity.Coupons;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.repository.CouponsRepository;
import com.example.fullstackbackend.repository.HoadonRepository;
import com.example.fullstackbackend.services.CouponsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CouponsServiceImpl implements CouponsService {

    private final CouponsRepository couponsRepository;

    private final HoadonRepository hoadonRepository;

    @Override
    public Optional<Coupons> detail(Integer id) {
        return couponsRepository.findById(id);
    }

    @Override
    public Coupons add(Coupons coupons) {
        coupons.setSoLuongHienTai(coupons.getSoLuong());
        System.out.println("coupons.getThoiGianKetThuc(): " + coupons.getThoiGianKetThuc());
        Coupons coupons1 = couponsRepository.save(coupons);
        return coupons1;
    }

    @Override
    public Coupons update(Coupons coupons, Integer id) {
        coupons.setIdCoupon(id);
        return couponsRepository.save(coupons);
    }

    @Override
    public Boolean delete(Integer id) {
        try {
            Coupons coupons = detail(id).orElseThrow();
            coupons.setTrangThai(10);
            couponsRepository.save(coupons);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Coupons> getAll() {
        return couponsRepository.findAll();
    }

    @Override
    public Boolean existsById(Integer id) {
        return couponsRepository.existsById(id);
    }

    @Override
    public CouponsDTO addCoupons(Integer idHd, String code) {
        if(checkHd(idHd)) {
            HoaDon hoaDon = hoadonRepository.findById(idHd).orElseThrow();
            if(hoaDon.getMaGiamGia() == null) {
                if(checkCoupons(code)) {
                    Coupons coupons = couponsRepository.findByCode(code).orElseThrow();
                    hoaDon.setMaGiamGia(coupons.getCode());
                    Integer soLuongCpCheck = coupons.getSoLuongHienTai();
                    if(soLuongCpCheck > 0) {
                        coupons.setSoLuongHienTai(soLuongCpCheck - 1);
                        Integer phanTram = coupons.getPhanTram();
                        BigDecimal soTienGiam = hoaDon.getThanhTien().multiply(BigDecimal.valueOf(Double.valueOf(phanTram)).divide(BigDecimal.valueOf(100)));
                        hoaDon.setSoTienGiamGia(soTienGiam);
                        BigDecimal thanhTien = hoaDon.getThanhTien().subtract(soTienGiam);
                        hoaDon.setThanhTien(thanhTien);
                        couponsRepository.save(coupons);
                        hoadonRepository.save(hoaDon);
                    }

                }
            } else {
                hoadonRepository.save(hoaDon);
            }
        }
        return null;
    }

    @Override
    public Optional<Coupons> detailByCode(String code) {
        return couponsRepository.findByCode(code);
    }

    private Boolean checkCoupons(String code) {
        Optional<Coupons> coupons = couponsRepository.findByCode(code);
        if(coupons.isPresent()) {
            return true;
        }
        return false;
    }

    private Boolean checkHd(Integer id) {
        Optional<HoaDon> hoaDon = hoadonRepository.findById(id);
        if(hoaDon.isPresent()) {
            return true;
        }
        return false;
    }
}
