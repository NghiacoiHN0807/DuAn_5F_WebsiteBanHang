package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.Coupons;

import java.util.List;

public interface CouponsService {

    Coupons detail(Integer id);

    Coupons add(Coupons coupons);

    Coupons update(Coupons coupons, Integer id);

    Boolean delete(Integer id);

    List<Coupons> getAll();

    Boolean existsById(Integer id);

}
