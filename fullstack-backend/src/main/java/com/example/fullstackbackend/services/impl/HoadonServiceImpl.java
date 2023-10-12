package com.example.fullstackbackend.services.impl;

<<<<<<< HEAD
import com.example.fullstackbackend.repository.HoadonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HoadonServiceImpl {
=======
import com.example.fullstackbackend.DTO.HoaDonDTO;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.repository.HoadonRepository;
import com.example.fullstackbackend.services.HoadonSevice;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoadonServiceImpl implements HoadonSevice {
>>>>>>> main

    @Autowired
    private HoadonRepository hoadonRepository;


<<<<<<< HEAD
=======
    @Override
    public List<HoaDon> getAll() {
        return null;
    }

    @Override
    public Page<HoaDon> hoaDonPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return hoadonRepository.findAll(pageable);
    }

    @Override
    public Page<HoaDon> hoaDonOffline(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return hoadonRepository.pageOfflineInvoice(pageable);
    }

    @Override
    public List<HoaDon> selectAllInvoiceWaiting() {
        return hoadonRepository.selectAllInvoiceWaiting();
    }

    @Override
    public Page<HoaDon> hoaDonOnline(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return hoadonRepository.pageOnlineInvoice(pageable);
    }

    @Override
    public HoaDon add(HoaDon add) {
        return hoadonRepository.save(add);
    }

    @Override
    public void delete(Integer id) {hoadonRepository.delete(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return hoadonRepository.existsById(id);
    }

    @Override
    public HoaDon update(HoaDon update) {
        return hoadonRepository.save(update);
    }

    @Override
    public Optional<HoaDon> detail(Integer id) {
        Optional<HoaDon> HoaDon = hoadonRepository.findById(id);
        return HoaDon;
    }

    @Override
    public HoaDon finByMaHD(Integer maHD) {
        HoaDon find = hoadonRepository.findByMaHd(maHD);
        return find;
    }

    @Override
    public HoaDon updatePaymentOnline(Integer idHd, HoaDon hoaDonDTO) {
        HoaDon hoaDon = hoadonRepository.findById(idHd).orElseThrow(()->new EntityNotFoundException("HoaDonNotFound"));

        hoaDon.setNgayThanhToan(hoaDonDTO.getNgayThanhToan());
        hoaDon.setTienDua(hoaDonDTO.getTienDua());
        hoaDon.setTrangThai(hoaDonDTO.getTrangThai());

        return hoadonRepository.save(hoaDon);
    }
>>>>>>> main
}
