package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.repository.ChitietsanphamRepository;
import com.example.fullstackbackend.services.ChitietsanphamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChitietsanphamServiceImpl implements ChitietsanphamService {

    @Autowired
    private ChitietsanphamRepository chitietsanphamRepository;

    @Override
    public Page<ChiTietSanPham> chiTietSP(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return chitietsanphamRepository.findAll(pageable);
    }

    @Override
    public List<Object[]> getSanPhamsWithSizes() {
        return chitietsanphamRepository.getSanPhamWithSizes();
    }

    @Override
    public List<ChiTietSanPham> findByProductName(String name) {
        return chitietsanphamRepository.findByProductName(name);
    }

    @Override
    public Optional<ChiTietSanPham> findByProductNameAndSize(String name, String size, String ms) {
        return chitietsanphamRepository.findByProductNameAndSize(name, size, ms);
    }

    @Override
    public List<ChiTietSanPham> findByIdSp(Integer id) {
        return chitietsanphamRepository.findByIdSp(id);
    }

    public List<ChiTietSanPham> findByProductId(Integer id) {
        return chitietsanphamRepository.findByProductId(id);
    }

    @Override
    public ChiTietSanPham add(ChiTietSanPham add) {
        return null;
    }

    @Override
    public ChiTietSanPham addAndUpdateSize(ChiTietSanPham ctsp, Integer soLuong) {
        ChiTietSanPham ctspUp = chitietsanphamRepository.checkExistSPandSize(ctsp.getIdSp().getIdSp(), ctsp.getIdSize().getIdSize());
        if (ctspUp != null) {
            ctspUp.setSoLuongTon(ctspUp.getSoLuongTon() + soLuong);
            return chitietsanphamRepository.save(ctspUp);
        }
        return chitietsanphamRepository.save(ctsp);
    }


    @Override
    public ChiTietSanPham delete(Integer id) {
        ChiTietSanPham ctsp = chitietsanphamRepository.findById(id).orElse(null);
        if(ctsp.getTrangThai() == 0){
            ctsp.setTrangThai(10);
        }else{
            ctsp.setTrangThai(0);
        }

        return chitietsanphamRepository.save(ctsp);
    }

    @Override
    public ChiTietSanPham update(ChiTietSanPham update) {
        return chitietsanphamRepository.save(update);
    }

    @Override
    public Optional<ChiTietSanPham> detail(Integer id) {
        return chitietsanphamRepository.findById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return chitietsanphamRepository.existsById(id);
    }

//    @Override
//    public ChiTietSanPham getChiTietSanPhamBySanPhamIds(Integer idSp) {
//        return chitietsanphamRepository.findByIdSp_IdSp(idSp);
//    }


}
