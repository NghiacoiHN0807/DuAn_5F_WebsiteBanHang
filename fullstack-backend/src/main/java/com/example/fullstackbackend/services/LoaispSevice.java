package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.LoaiSp;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface LoaispSevice {
    Page<LoaiSp> chatlieuPage(Integer pageNo, Integer size, Integer trangThai);
}
