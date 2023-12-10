package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.repository.ChitietsanphamRepository;
import com.example.fullstackbackend.repository.HoadonRepository;
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
    private HoadonRepository hoadonRepo;

    @Autowired
    private HoadonchitietRepository hoadonchitietRepository;

    @Autowired
    private ChitietsanphamRepository chitietsanphamRepo;

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

    // Update product if it's exsit
    public HoaDonChiTiet updateHoaDonChiTiet(List<HoaDonChiTiet> hoaDonChiTiets, HoaDonChiTiet add) {
        if (hoaDonChiTiets.isEmpty()) {
            return hoadonchitietRepository.save(add);
        } else {
            for (HoaDonChiTiet x : hoaDonChiTiets) {
                ChiTietSanPham chiTietSanPham = chitietsanphamRepo.findById(x.getIdCtsp().getIdCtsp()).orElseThrow();
                int newQuantity = x.getSoLuong() + add.getSoLuong();
                x.setSoLuong(newQuantity);
                BigDecimal newPrice = chiTietSanPham.getGiaThucTe().multiply(new BigDecimal(newQuantity));
                x.setDonGia(newPrice);
                return hoadonchitietRepository.save(x);
            }
        }
        return null;
    }


    @Override
    public HoaDonChiTiet add(HoaDonChiTiet add) {
        List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietRepository.findAllByIdCtspExsit(add.getIdHd().getIdHd(), add.getIdCtsp().getIdCtsp());

        System.out.println("hoaDonChiTiets: " + hoaDonChiTiets.size());
        HoaDon hoaDon = hoadonRepo.findById(add.getIdHd().getIdHd()).orElseThrow();
        if (hoaDon.getTrangThai() < 8) {
            addLS(add, 1);
            return updateHoaDonChiTiet(hoaDonChiTiets, add);
        } else {
            return updateHoaDonChiTiet(hoaDonChiTiets, add);
        }
    }

    @Override
    public HoaDonChiTiet add1(HoaDonChiTiet add) {
        return hoadonchitietRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        HoaDonChiTiet detailHDCT = detail(id).orElseThrow();
        if (detailHDCT.getIdHd().getTrangThai() < 8) {
            addLS(detailHDCT, 2);
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
        List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietRepository.findAllByIdCtspExsit(update.getIdHd().getIdHd(), update.getIdCtsp().getIdCtsp());

        HoaDon hoaDon = hoadonRepo.findById(update.getIdHd().getIdHd()).orElseThrow();
        if (hoaDon.getTrangThai() < 8) {
            addLS(update, 3);
            return updateHoaDonChiTiet(hoaDonChiTiets, update);

        } else {
            return updateHoaDonChiTiet(hoaDonChiTiets, update);

        }

    }

    @Override
    public HoaDonChiTiet returnItem(HoaDonChiTiet update) {
        // Save history time-line
        addLS(update, 4);

        // Update old hdct
        HoaDonChiTiet updateOLDHDCT = hoadonchitietRepository.findById(update.getIdHdct()).orElseThrow();
        // Get quantity
        int quantity = updateOLDHDCT.getSoLuong() - update.getSoLuong();
        updateOLDHDCT.setSoLuong(quantity);

        //Update TongTien
        BigDecimal tongTien = updateOLDHDCT.getIdCtsp().getGiaThucTe().multiply(BigDecimal.valueOf(quantity));
        updateOLDHDCT.setDonGia(tongTien);
        hoadonchitietRepository.save(updateOLDHDCT);

        // Delete product if quantity = 0
        if (quantity <= 0) {
            hoadonchitietRepository.deleteById(update.getIdHdct());
        }
        // Update tongTien and thanhTien
        // Find hd
        HoaDon hoaDon = hoadonRepo.findById(update.getIdHd().getIdHd()).orElseThrow();
        List<HoaDonChiTiet> donChiTiets = hoadonchitietRepository.findAllByIdHd_IdHdAndTrangThai(update.getIdHd().getIdHd(), 0);
        // Prepare the bill
        if (hoaDon.getSoTienGiamGia() == null) {
            hoaDon.setSoTienGiamGia(BigDecimal.ZERO);
        }
        if (hoaDon.getTienShip() == null) {
            hoaDon.setTienShip(BigDecimal.ZERO);
        }
        BigDecimal tongGiaTien = donChiTiets.stream()
                .map(HoaDonChiTiet::getDonGia)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal tienShip = hoaDon.getTienShip() != null ? hoaDon.getTienShip() : BigDecimal.ZERO;
        BigDecimal tienGiam = hoaDon.getSoTienGiamGia() != null ? hoaDon.getSoTienGiamGia() : BigDecimal.ZERO;

        BigDecimal thanhTien = tongGiaTien.add(tienShip).subtract(tienGiam);
        hoaDon.setTongTien(tongGiaTien);
        hoaDon.setThanhTien(thanhTien);
        hoadonRepo.save(hoaDon);

        // Add return item
        HoaDonChiTiet donChiTietss = hoadonchitietRepository.findByIdHd_IdHdAndTrangThai(update.getIdHd().getIdHd(), 10);
        if (donChiTietss != null) {
            int quantityExist = donChiTietss.getSoLuong() + update.getSoLuong();
            donChiTietss.setSoLuong(quantityExist);
            donChiTietss.setLyDoHuy(update.getLyDoHuy());
            return hoadonchitietRepository.save(donChiTietss);
        } else {
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
            ls.setMoTa("Trả Sản Phẩm: " + addLS.getIdCtsp().getIdSp().getTenSp() + " Với số lượng: " + addLS.getSoLuong() + "Lý Do Hủy Đơn: " + addLS.getLyDoHuy());
            ls.setNgayThayDoi(currentTimestamp);
            // Update Inventory number
            ChiTietSanPham chiTietSanPhams = chitietsanphamRepo.findById(addLS.getIdCtsp().getIdCtsp()).orElseThrow();

            System.out.println("Số Lượng Còn Lại:" + (chiTietSanPhams.getSoLuongTon() + addLS.getSoLuong()));
            chiTietSanPhams.setSoLuongTon(chiTietSanPhams.getSoLuongTon() + addLS.getSoLuong());
            System.out.println("GetIDCTSP:" + chiTietSanPhams.getIdCtsp());
            chitietsanphamRepo.save(chiTietSanPhams);

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
    public List<HoaDonChiTiet> findAllByIDHD(Integer idHd) {
        return hoadonchitietRepository.findAllByIdHd_IdHdAndTrangThai(idHd, 0);
    }

    @Override
    public HoaDonChiTiet updateCart(ChiTietSanPham idCTSP, Integer soLuong, BigDecimal donGia, Integer idHD) {
        return hoadonchitietRepository.updateCart(idCTSP, soLuong, donGia, idHD);
    }
}