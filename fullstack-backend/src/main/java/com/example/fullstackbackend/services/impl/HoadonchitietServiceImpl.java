package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.repository.HoadonchitietRepository;
import com.example.fullstackbackend.repository.LichSuHoaDonRepository;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class HoadonchitietServiceImpl implements HoadonchitietSevice {

    @Autowired
    private HoadonchitietRepository hoadonchitietRepository;

    @Autowired
    private LichSuHoaDonRepository lichSuHoaDonRepository;

    @Override
    public List<HoaDonChiTiet> getAll() {
        return null;
    }

    @Override
    public List<HoaDonChiTiet> chatlieuPage() {
        return hoadonchitietRepository.findAll();
    }

    @Override
    public List<Object[]> getListProductOncart(Integer idHd) {
        return hoadonchitietRepository.getListProductOncart(idHd);
    }

    @Override
    public HoaDonChiTiet add(HoaDonChiTiet add) {
        if (add.getTrangThai() < 8) {
            addLS(add, 1);
            return hoadonchitietRepository.save(add);
        } else {
            return hoadonchitietRepository.save(add);
        }


    }

    @Override
    public void delete(Integer id) {
        Optional<HoaDonChiTiet> detailHDCT = detail(id);
        if (detailHDCT.get().getTrangThai() >= 0 || detailHDCT.get().getTrangThai() < 8) {
            addLS(detailHDCT.get(), 2);
            hoadonchitietRepository.deleteById(id);
        } else {
            hoadonchitietRepository.deleteById(id);
        }
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
    public LichSuHoaDon addLS(HoaDonChiTiet addLS, int status) {
        // Get datetime now
        java.util.Date currentDate = new java.util.Date();
        Timestamp currentTimestamp = new Timestamp(currentDate.getTime());
        LichSuHoaDon ls = new LichSuHoaDon();
        if (status == 1) {
            ls.setIdHd(addLS.getIdHd());
            ls.setTrangThai(7);
            ls.setMoTa("Thêm sản phẩm: " + addLS.getIdCtsp().getIdSp().getTenSp() + " Với số lượng: " + addLS.getSoLuong());
            ls.setNgayThayDoi(currentTimestamp);
            return lichSuHoaDonRepository.save(ls);
        } else if (status == 2) {
            // Chuyển đổi thành Timestamp
            ls.setIdHd(addLS.getIdHd());
            ls.setTrangThai(7);
            ls.setMoTa("Xóa Sản Phẩm: " + addLS.getIdCtsp().getIdSp().getTenSp());
            ls.setNgayThayDoi(currentTimestamp);
            return lichSuHoaDonRepository.save(ls);
        } else if (status == 3) {
            ls.setIdHd(addLS.getIdHd());
            ls.setTrangThai(7);
            ls.setMoTa("Sửa sản phẩm: " + addLS.getIdCtsp().getIdSp().getTenSp() + " Với số lượng: " + addLS.getSoLuong());
            ls.setNgayThayDoi(currentTimestamp);
            return lichSuHoaDonRepository.save(ls);
        }
        return null;
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
}
