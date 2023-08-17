package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.DiaChi;
import com.example.fullstackbackend.repository.DiaChiRepository;
import com.example.fullstackbackend.services.DiaChiSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiaChiServiceImpl implements DiaChiSevice {

    @Autowired
    private DiaChiRepository DiaChiRepository;


    @Override
    public Page<DiaChi> getAllByTK(String maTaiKhoan,Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return DiaChiRepository.findByMaTaiKhoan_MaTaiKhoan(maTaiKhoan ,pageable);
    }

    @Override
    public Page<DiaChi> getAll(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return DiaChiRepository.findAll(pageable);
    }


    @Override
    public DiaChi add(DiaChi add) {
        if(DiaChiRepository.CountTaiKhoan(add.getTaiKhoan().getMaTaiKhoan()) >= 5){
            return null;
        }else {
            return DiaChiRepository.save(add);
        }
    }

    @Override
    public void delete(Integer id) {
        DiaChiRepository.XoaMem(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return DiaChiRepository.existsById(id);
    }

    @Override
    public DiaChi update(DiaChi update) {
       return DiaChiRepository.save(update);
    }

    @Override
    public Optional<DiaChi> detail(Integer id) {
        Optional<DiaChi> DiaChi = DiaChiRepository.findById(id);
        return DiaChi;
    }
}
