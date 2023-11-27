package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.Coupons;
import com.example.fullstackbackend.repository.CouponsRepository;
import com.example.fullstackbackend.services.CouponsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponsServiceImpl implements CouponsService {

    private final CouponsRepository couponsRepository;

    @Override
    public Coupons detail(Integer id) {
        return couponsRepository.findById(id).orElseThrow();
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
            Coupons coupons = detail(id);
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
}
