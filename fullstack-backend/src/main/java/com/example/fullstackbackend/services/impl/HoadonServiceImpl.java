package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.repository.HoadonRepository;
import com.example.fullstackbackend.services.HoadonSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoadonServiceImpl implements HoadonSevice {

    @Autowired
    private HoadonRepository hoadonRepository;


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
    public HoaDon add(HoaDon add) {
        return hoadonRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        hoadonRepository.delete(id);
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
}
