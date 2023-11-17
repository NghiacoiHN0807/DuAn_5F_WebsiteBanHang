package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.GioHangChiTiet;

import java.util.List;

public interface GioHangChiTietSevice {
    List<GioHangChiTiet> getAll(Integer idKh);

}