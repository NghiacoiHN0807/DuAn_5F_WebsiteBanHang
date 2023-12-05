package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.repository.HoadonchitietRepository;
import com.example.fullstackbackend.repository.LichSuHoaDonRepository;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public Page<HoaDonChiTiet> getListProductByIDKH(Integer idKH, Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return hoadonchitietRepository.findByIdHd_IdKH_IdTaiKhoan(idKH, pageable);
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
    public HoaDonChiTiet add1(HoaDonChiTiet add) {
        return hoadonchitietRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        Optional<HoaDonChiTiet> detailHDCT = detail(id);
        if (detailHDCT.get().getTrangThai() < 8) {
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
    public HoaDonChiTiet returnItem(HoaDonChiTiet update) {
        // Save history time-line
        addLS(update, 4);

        // Update old hdct
        HoaDonChiTiet updateOLDHDCT = hoadonchitietRepository.findById(update.getIdHdct()).orElseThrow();
        System.out.println("updateOLDHDCT: " + updateOLDHDCT.getSoLuong());
        // Get quantity
        System.out.println("updateOLDHDCT.getSoLuong(): " + updateOLDHDCT.getSoLuong());
        System.out.println("update.getSoLuong(): " + update.getSoLuong());
        int quantity = updateOLDHDCT.getSoLuong()-update.getSoLuong();
        System.out.println("quantity " + quantity);
        updateOLDHDCT.setSoLuong(quantity);
        //Update TongTien
        BigDecimal tongTien = updateOLDHDCT.getIdCtsp().getGiaThucTe().multiply(BigDecimal.valueOf(quantity));
        updateOLDHDCT.setDonGia(tongTien);
        System.out.println("updateOLDHDCT.getIdHdct(): " + updateOLDHDCT.getIdHdct());
        hoadonchitietRepository.save(updateOLDHDCT);

        // Add return item
        HoaDonChiTiet newHdcteturn = new HoaDonChiTiet();
        newHdcteturn.setIdHd(update.getIdHd());
        newHdcteturn.setIdCtsp(update.getIdCtsp());
        newHdcteturn.setSoLuong(update.getSoLuong());
        BigDecimal donGia = updateOLDHDCT.getIdCtsp().getGiaThucTe().multiply(BigDecimal.valueOf(update.getSoLuong()));
        newHdcteturn.setDonGia(donGia);
        newHdcteturn.setLyDoHuy(update.getLyDoHuy());
        newHdcteturn.setTrangThai(10);

        return hoadonchitietRepository.save(newHdcteturn);

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
        } else if (status == 4) {
            ls.setIdHd(addLS.getIdHd());
            ls.setTrangThai(6);
            ls.setMoTa("Trả Sản Phẩm: " + addLS.getIdCtsp().getIdSp().getTenSp() + " Với số lượng: " + addLS.getSoLuong());
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