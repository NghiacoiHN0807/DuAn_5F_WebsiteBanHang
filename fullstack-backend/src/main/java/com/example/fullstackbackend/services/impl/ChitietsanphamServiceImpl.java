package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.CTSPCustom;
import com.example.fullstackbackend.DTO.SanPhamCustom;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.repository.ChitietsanphamRepository;
import com.example.fullstackbackend.repository.MausacRepository;
import com.example.fullstackbackend.repository.SanphamRepository;
import com.example.fullstackbackend.repository.SizeRepository;
import com.example.fullstackbackend.services.ChitietsanphamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChitietsanphamServiceImpl implements ChitietsanphamService {

    @Autowired
    private ChitietsanphamRepository chitietsanphamRepository;

    @Autowired
    private SanphamRepository spRepo;

    @Autowired
    private MausacRepository msRepo;

    @Autowired
    private SizeRepository sizeRepo;

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
    public List<ChiTietSanPham> finAllByIDCTSP(Integer idCtsp) {
        return chitietsanphamRepository.findAllByIdCtsp(idCtsp);
    }

    @Override
    public Optional<ChiTietSanPham> findByIdCTSP(Integer idCTSP) {
        return chitietsanphamRepository.findById(idCTSP);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return chitietsanphamRepository.existsById(id);
    }

    @Override
    public ChiTietSanPham addColorAndSize(Integer idSp, Integer idMs, Integer idSize) {
        if(chitietsanphamRepository.existsBySpAndMsAndSize(idSp, idMs, idSize).size() > 0){
            return chitietsanphamRepository.existsBySpAndMsAndSize(idSp, idMs, idSize).get(0);
        }else {
            ChiTietSanPham ctsp = new ChiTietSanPham();
            ctsp.setIdSp(spRepo.findById(idSp).orElse(null));
            ctsp.setIdMs(msRepo.findById(idMs).orElse(null));
            ctsp.setIdSize(sizeRepo.findById(idSize).orElse(null));
            ctsp.setTrangThai(1);
            return chitietsanphamRepository.save(ctsp);
        }
    }

    @Override
    public ChiTietSanPham updateNumber(Integer idCtsp, BigDecimal giaNhap, BigDecimal giaBan, Integer soLuongTon, Integer trangThai) {
        ChiTietSanPham ctsp = chitietsanphamRepository.findById(idCtsp).orElse(null);
        BigDecimal giaB = ctsp.getGiaBan();
        BigDecimal giaTT = ctsp.getGiaThucTe();
        ctsp.setGiaNhap(giaNhap);
        ctsp.setGiaBan(giaBan);
        ctsp.setGiaThucTe(giaBan);
        ctsp.setSoLuongTon(soLuongTon);
        ctsp.setTrangThai(trangThai);
        return chitietsanphamRepository.save(ctsp);
    }

    @Override
    public List<CTSPCustom> getCtspForAd(Integer idSp) {
        List<CTSPCustom> dtos = new ArrayList<>();
        for (Object[] row : chitietsanphamRepository.ctspForAd(idSp)) {
            CTSPCustom spCustom = new CTSPCustom();
            spCustom.setIdCtsp((Integer) row[0]);
            spCustom.setTenMs((String) row[1]);
            spCustom.setTenSize((String) row[2]);
            spCustom.setGiaNhap((BigDecimal) row[3]);
            spCustom.setGiaBan((BigDecimal) row[4]);
            spCustom.setSoLuongTon((Integer) row[5]);
            spCustom.setTrangThai((Integer) row[6]);
            dtos.add(spCustom);
        }

        return dtos;
    }


}