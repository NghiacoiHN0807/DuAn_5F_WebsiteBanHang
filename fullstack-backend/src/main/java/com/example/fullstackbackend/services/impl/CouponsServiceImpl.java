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
import java.util.Date;
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
        Date now = new Date();
        coupons.setSoLuongHienTai(coupons.getSoLuong());
        if(coupons.getThoiGianTao().after(now)) {
            coupons.setTrangThai(1);
        }
        Coupons coupons1 = couponsRepository.save(coupons);
        return coupons1;
    }

    @Override
    public Coupons update(Coupons coupons, Integer id) {
        Date now = new Date();
        Coupons coupons1 = detail(id).orElseThrow();
        coupons.setIdCoupon(id);
        if(coupons.getThoiGianTao().after(now)) {
            coupons.setTrangThai(1);
        }
        Integer soLuong = coupons1.getSoLuong() + coupons.getSoLuongHienTai();
        coupons.setSoLuong(soLuong);
        return couponsRepository.save(coupons);
    }

    @Override
    public Boolean delete(Integer id, Integer trangThai) {
        try {
            Coupons coupons = detail(id).orElseThrow();
            coupons.setTrangThai(trangThai);
            couponsRepository.save(coupons);
            return true;
        } catch (Exception e) {
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
        CouponsDTO couponsDTO = new CouponsDTO();
        if (checkHd(idHd)) {
            HoaDon hoaDon = hoadonRepository.findById(idHd).orElseThrow();
            couponsDTO.setHoaDon(hoaDon);
            if (hoaDon.getMaGiamGia() == null) {
                if (checkCoupons(code)) {
                    Coupons coupons = couponsRepository.findByCode(code).orElseThrow();
                    couponsDTO.setCode(code);
                    hoaDon.setMaGiamGia(coupons.getCode());
                    Integer soLuongCpCheck = coupons.getSoLuongHienTai();
                    if (soLuongCpCheck > 0) {
                        coupons.setSoLuongHienTai(soLuongCpCheck - 1);
                        Integer phanTram = coupons.getPhanTram();
                        couponsDTO.setPhanTramGiam(phanTram);
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
        return couponsDTO;
    }

    @Override
    public Optional<Coupons> detailByCode(String code) {
        return couponsRepository.findByCode(code);
    }

    @Override
    public Boolean removeCoupons(Integer idHd) {
        try {
            CouponsDTO couponsDTO = new CouponsDTO();
            if (checkHd(idHd)) {
                HoaDon hoaDon = hoadonRepository.findById(idHd).orElseThrow();
                couponsDTO.setHoaDon(hoaDon);
                if (hoaDon.getMaGiamGia() != null) {
                    Coupons coupons = couponsRepository.findByCode(hoaDon.getMaGiamGia()).orElseThrow();
                    couponsDTO.setCode(null);
                    hoaDon.setMaGiamGia(null);
                    Integer soLuongCpCheck = coupons.getSoLuongHienTai();
                    coupons.setSoLuongHienTai(soLuongCpCheck + 1);
                    couponsDTO.setPhanTramGiam(null);
                    BigDecimal thanhTien = hoaDon.getThanhTien().add(hoaDon.getSoTienGiamGia());
                    hoaDon.setSoTienGiamGia(null);
                    hoaDon.setThanhTien(thanhTien);
                    couponsRepository.save(coupons);
                    hoadonRepository.save(hoaDon);

                } else {
                    hoadonRepository.save(hoaDon);
                }
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean removeAll(List<Integer> ids) {
        try {
            for (Integer s : ids) {
                Coupons coupons = detail(s).orElseThrow();
                coupons.setTrangThai(10);
                couponsRepository.save(coupons);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private Boolean checkCoupons(String code) {
        Optional<Coupons> coupons = couponsRepository.findByCode(code);
        if (coupons.isPresent()) {
            return true;
        }
        return false;
    }

    private Boolean checkHd(Integer id) {
        Optional<HoaDon> hoaDon = hoadonRepository.findById(id);
        if (hoaDon.isPresent()) {
            return true;
        }
        return false;
    }
}
