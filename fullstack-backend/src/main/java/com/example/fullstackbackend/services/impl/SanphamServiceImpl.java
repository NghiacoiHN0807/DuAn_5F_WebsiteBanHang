package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.SanPhamClientDTO;
import com.example.fullstackbackend.DTO.SanPhamCustom;
import com.example.fullstackbackend.DTO.SanPhamDTO;
import com.example.fullstackbackend.DTO.SanPhamIgDTO;
import com.example.fullstackbackend.DTO.SanPhamWithMinImageDTO;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.SanphamRepository;
import com.example.fullstackbackend.services.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SanphamServiceImpl implements SanPhamService {

    @Autowired
    private SanphamRepository sanphamRepository;

    @Override
    public Page<SanPham> getAll(Integer pageNo, Integer limit, Integer tinhTrang) {
        Pageable pageable = PageRequest.of(pageNo, limit);
        return sanphamRepository.findAllByTinhTrang(tinhTrang, pageable);
    }

    public List<SanPham> getAll() {
        return sanphamRepository.findAll();
    }

    @Override
    public Page<SanPham> sanPhamPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return sanphamRepository.findAll(pageable);
    }

    @Override
    public List<SanPhamCustom> sanPhamCustom() {
        List<SanPhamCustom> dtos = new ArrayList<>();
        for (Object[] row : sanphamRepository.getSpWithImg()) {
            SanPhamCustom spCustom = new SanPhamCustom();
            spCustom.setIdSp((Integer) row[0]);
            spCustom.setMaSp((String) row[1]);
            spCustom.setTenSp((String) row[2]);
            spCustom.setMoTa((String) row[3]);
            spCustom.setTrangThai((Integer) row[4]);
            spCustom.setUrl((String) row[5]);
            spCustom.setGiaMin((BigDecimal) row[6]);
            spCustom.setGiaMax((BigDecimal) row[7]);
            dtos.add(spCustom);
        }

        return dtos;
    }

    @Override
    public List<SanPhamClientDTO> sanPhamForClient() {
        List<SanPhamClientDTO> dtos = new ArrayList<>();
        for (Object[] row : sanphamRepository.getSpForClient()) {
            SanPhamClientDTO spCustom = new SanPhamClientDTO();
            spCustom.setIdSp((Integer) row[0]);
            spCustom.setChatLieus((String) row[1]);
            spCustom.setLoaiSPs((String) row[2]);
            spCustom.setXuatXus((String) row[3]);
            spCustom.setTayAos((String) row[4]);
            spCustom.setCoAos((String) row[5]);
            spCustom.setSizes((String) row[6]);
            spCustom.setMauSacs((String) row[7]);

            spCustom.setTenSp((String) row[8]);
            spCustom.setTrangThai((Integer) row[9]);
            spCustom.setUrl((String) row[10]);
            spCustom.setGiaMin((BigDecimal) row[11]);
            spCustom.setGiaMax((BigDecimal) row[12]);
            spCustom.setGiaThucTe((BigDecimal) row[13]);
            dtos.add(spCustom);
        }

        return dtos;
    }

    @Override
    public SanPham add(SanPham add) {
        return sanphamRepository.save(add);
    }

    @Override
    public SanPham delete(Integer id) {
        SanPham sp = sanphamRepository.findById(id).orElse(null);
        if (sp.getTrangThai() == 0) {
            sp.setTrangThai(10);
        }
        return sanphamRepository.save(sp);
    }

    @Override
    public SanPham update(SanPham update) {
        return sanphamRepository.save(update);
    }

    @Override
    public Optional<SanPham> detail(Integer id) {
        return sanphamRepository.findById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return sanphamRepository.existsById(id);
    }

    @Override
    public List<Object[]> getSanPhamWithMinImageUrl() {
        return sanphamRepository.getSanPhamWithMinImageUrl();
    }

    @Override
    public SanPhamWithMinImageDTO getSanPhamWithMinImageUrlByIdSp(Integer idSp) {
        List<Object[]> results = sanphamRepository.getSanPhamWithMinImageUrlByIdSp(idSp);

        List<SanPhamWithMinImageDTO> dto = new ArrayList<>();
        for (Object[] row : results) {
            SanPhamIgDTO sp = new SanPhamIgDTO();
            sp.setIdSp((Integer) row[0]);
            sp.setMaSp((String) row[1]);
            sp.setTenSp((String) row[2]);
            sp.setIdCl((Integer) row[3]);
            sp.setIdLsp((Integer) row[4]);
            sp.setIdXx((Integer) row[5]);
            sp.setIdTayAo((Integer) row[6]);
            sp.setIdCoAo((Integer) row[7]);
            sp.setMoTa((String) row[8]);
            sp.setTrangThai((Integer) row[9]);
            String imageUrl = (String) row[10];
            sp.setGiaSmall((BigDecimal) row[11]);
            sp.setGiaBig((BigDecimal) row[12]);
            dto.add(new SanPhamWithMinImageDTO(sp, imageUrl));
        }

        return dto.get(0);
    }

    @Override
    public Page<SanPhamDTO> getSanPhamDetails(Integer pageNo, Integer size) {
        return null;
    }

    @Override
    public List<SanPhamDTO> getSanPhamDetails() {
        List<Object[]> result = sanphamRepository.getSanPhamDetails();

        List<SanPhamDTO> dtos = new ArrayList<>();

        for (Object[] row : result) {
            SanPhamDTO sanPhamDTO = new SanPhamDTO();
            sanPhamDTO.setIdSp((Integer) row[0]);
            sanPhamDTO.setMaSp((String) row[1]);
            sanPhamDTO.setTenSp((String) row[2]);
            sanPhamDTO.setTenChuongTrinh((String) row[3]);
            sanPhamDTO.setMucGiamPhanTram((BigDecimal) row[4]);
            sanPhamDTO.setMucGiamTienMat((BigDecimal) row[5]);
            sanPhamDTO.setUrlImage((String) row[6]);
            sanPhamDTO.setIdGgct((Integer) row[7]);
            sanPhamDTO.setIdGiamGia((Integer) row[8]);
            sanPhamDTO.setNgayBatDau((Timestamp) row[9]);
            sanPhamDTO.setNgayKetThuc((Timestamp) row[10]);
            sanPhamDTO.setGiaBanMin((BigDecimal) row[11]);
            sanPhamDTO.setGiaBanMax((BigDecimal) row[12]);
            sanPhamDTO.setGiaThucTeMin((BigDecimal) row[13]);
            sanPhamDTO.setGiaThucTeMax((BigDecimal) row[14]);
            sanPhamDTO.setTrangThai((Integer) row[15]);

            dtos.add(sanPhamDTO);
        }

        return dtos;
    }

    @Override
    public List<SanPhamClientDTO> getSpGiamGiaForClient() {
        List<SanPhamClientDTO> dtos = new ArrayList<>();
        for (Object[] row : sanphamRepository.getSpGiamGiaForClient()) {
            SanPhamClientDTO spCustom = new SanPhamClientDTO();
            spCustom.setIdSp((Integer) row[0]);
            spCustom.setChatLieus((String) row[1]);
            spCustom.setLoaiSPs((String) row[2]);
            spCustom.setXuatXus((String) row[3]);
            spCustom.setTayAos((String) row[4]);
            spCustom.setCoAos((String) row[5]);
            spCustom.setSizes((String) row[6]);
            spCustom.setMauSacs((String) row[7]);

            spCustom.setTenSp((String) row[8]);
            spCustom.setTrangThai((Integer) row[9]);
            spCustom.setUrl((String) row[10]);
            spCustom.setGiaMin((BigDecimal) row[11]);
            spCustom.setGiaMax((BigDecimal) row[12]);
            spCustom.setGiaThucTe((BigDecimal) row[13]);
            dtos.add(spCustom);
        }

        return dtos;
    }

    @Override
    public List<SanPhamClientDTO> relatedProduct(Integer idLsp, Integer idSp) {
        List<SanPhamClientDTO> dtos = new ArrayList<>();
        for (Object[] row : sanphamRepository.getRelatedProduct(idLsp, idSp)) {
            SanPhamClientDTO spCustom = new SanPhamClientDTO();
            spCustom.setIdSp((Integer) row[0]);
            spCustom.setChatLieus((String) row[1]);
            spCustom.setLoaiSPs((String) row[2]);
            spCustom.setXuatXus((String) row[3]);
            spCustom.setTayAos((String) row[4]);
            spCustom.setCoAos((String) row[5]);
            spCustom.setSizes((String) row[6]);
            spCustom.setMauSacs((String) row[7]);

            spCustom.setTenSp((String) row[8]);
            spCustom.setTrangThai((Integer) row[9]);
            spCustom.setUrl((String) row[10]);
            spCustom.setGiaMin((BigDecimal) row[11]);
            spCustom.setGiaMax((BigDecimal) row[12]);
            spCustom.setGiaThucTe((BigDecimal) row[13]);
            dtos.add(spCustom);
        }

        return dtos;
    }

    @Override
    public List<SanPhamClientDTO> getTopSpBanChayForClient() {
        List<SanPhamClientDTO> dtos = new ArrayList<>();
        for (Object[] row : sanphamRepository.getTopSpBanChayForClient()) {
            SanPhamClientDTO spCustom = new SanPhamClientDTO();
            spCustom.setIdSp((Integer) row[0]);
            spCustom.setChatLieus((String) row[1]);
            spCustom.setLoaiSPs((String) row[2]);
            spCustom.setXuatXus((String) row[3]);
            spCustom.setTayAos((String) row[4]);
            spCustom.setCoAos((String) row[5]);
            spCustom.setSizes((String) row[6]);
            spCustom.setMauSacs((String) row[7]);

            spCustom.setTenSp((String) row[8]);
            spCustom.setTrangThai((Integer) row[9]);
            spCustom.setUrl((String) row[10]);
            spCustom.setGiaMin((BigDecimal) row[11]);
            spCustom.setGiaMax((BigDecimal) row[12]);
            spCustom.setGiaThucTe((BigDecimal) row[13]);
            spCustom.setSoLuongBan((BigDecimal) row[14]);
            dtos.add(spCustom);
        }

        return dtos;
    }

    @Override
    public List<Object[]> topSptrend() {
        return sanphamRepository.topSptrending();
    }


}
