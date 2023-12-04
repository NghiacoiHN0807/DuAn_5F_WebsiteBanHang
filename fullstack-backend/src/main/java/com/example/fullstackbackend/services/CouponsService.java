package com.example.fullstackbackend.services;

import com.example.fullstackbackend.DTO.CouponsDTO;
import com.example.fullstackbackend.entity.Coupons;

import java.util.List;
import java.util.Optional;

public interface CouponsService {

    Optional<Coupons> detail(Integer id);

    Coupons add(Coupons coupons);

    Coupons update(Coupons coupons, Integer id);

    Boolean delete(Integer id, Integer trangThai);

    List<Coupons> getAll();

    Boolean existsById(Integer id);

    CouponsDTO addCoupons(Integer idHd, String code);

    Optional<Coupons> detailByCode(String code);

    Boolean removeCoupons(Integer idHd);

}
