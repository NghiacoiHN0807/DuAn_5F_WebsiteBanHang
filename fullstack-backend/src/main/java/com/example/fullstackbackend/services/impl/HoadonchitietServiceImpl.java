package com.example.fullstackbackend.services.impl;

<<<<<<< HEAD
import com.example.fullstackbackend.repository.HoadonchitietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HoadonchitietServiceImpl {
=======
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.repository.HoadonchitietRepository;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class HoadonchitietServiceImpl implements HoadonchitietSevice {
>>>>>>> main

    @Autowired
    private HoadonchitietRepository hoadonchitietRepository;

<<<<<<< HEAD
=======
    @Override
    public List<HoaDonChiTiet> getAll() {
        return null;
    }

    @Override
    public Page<HoaDonChiTiet> chatlieuPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return hoadonchitietRepository.findAll(pageable);
    }

    @Override
    public Page<Object[]> getListProductOncart(Integer pageNo, Integer size, Integer idHd) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return hoadonchitietRepository.getListProductOncart(pageable, idHd);
    }

    @Override
    public HoaDonChiTiet add(HoaDonChiTiet add) {
        return hoadonchitietRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        hoadonchitietRepository.deleteById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return hoadonchitietRepository.existsById(id);
    }

    @Override
    public HoaDonChiTiet update(HoaDonChiTiet update) {
        return hoadonchitietRepository.save(update);
    }

    @Override
    public Optional<HoaDonChiTiet> detail(Integer id) {

        return hoadonchitietRepository.findById(id);
    }

    @Override
    public List<HoaDonChiTiet> getOne(Integer idHd) {
        return hoadonchitietRepository.detailHDCT(idHd);
    }

    @Override
    public HoaDonChiTiet updateCart(ChiTietSanPham idCTSP, Integer soLuong, BigDecimal donGia, Integer idHD) {
        return hoadonchitietRepository.updateCart(idCTSP, soLuong, donGia, idHD);
    }
>>>>>>> main
}
