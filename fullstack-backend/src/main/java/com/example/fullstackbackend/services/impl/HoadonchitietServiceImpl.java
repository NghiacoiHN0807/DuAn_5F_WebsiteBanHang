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
import org.springframework.http.ResponseEntity;
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
    public List<Object[]> getListProductOncart2(Integer idHd) {
        return hoadonchitietRepository.getListProductOncart2(idHd);
    }

    @Override
    public Page<HoaDonChiTiet> getListProductByIDKH(Integer idKH, Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return hoadonchitietRepository.findByIdHd_IdKH_IdTaiKhoan(idKH, pageable);
    }

    // Update product if it's exsit
    public ResponseEntity<?> updateHoaDonChiTiet(HoaDonChiTiet add) {
        List<HoaDonChiTiet> hoaDonChiTiets1 = hoadonchitietRepository.findAllByIdCtspExsit(add.getIdHd().getIdHd(), add.getIdCtsp().getIdCtsp());

        if (hoaDonChiTiets1.isEmpty()) {
            hoadonchitietRepository.save(add);
            HoaDon hoaDon = hoadonRepo.findById(add.getIdHd().getIdHd()).orElseThrow();
            BigDecimal tongTien = BigDecimal.ZERO;

            List<HoaDonChiTiet> hoaDonChiTiets2 = hoadonchitietRepository.findAllByIdHdANDTT(add.getIdHd().getIdHd(), 0);

            for (HoaDonChiTiet x : hoaDonChiTiets2) {
                tongTien = tongTien.add(x.getDonGia());
            }

            hoaDon.setTongTien(tongTien);
            System.out.println("tongTien: " + tongTien);

            if (hoaDon.getSoTienGiamGia() == null) {
                hoaDon.setSoTienGiamGia(BigDecimal.ZERO);
            }
            if (hoaDon.getTienShip() == null) {
                hoaDon.setTienShip(BigDecimal.ZERO);
            }
            BigDecimal thanhTien = tongTien.add(hoaDon.getTienShip()).subtract(hoaDon.getSoTienGiamGia());
            hoaDon.setThanhTien(thanhTien);

            return ResponseEntity.ok(hoadonRepo.save(hoaDon));
        } else {
            // Update product on cart if it's exist
            HoaDonChiTiet updateExist = hoadonchitietRepository.findByIdCtspExsit(add.getIdHd().getIdHd(), add.getIdCtsp().getIdCtsp()).orElseThrow();
            //New Quantity
            int newQuantity = updateExist.getSoLuong() + add.getSoLuong();
            updateExist.setSoLuong(newQuantity);
            // New Price
//            ChiTietSanPham ctsp = chitietsanphamRepo.findById(add);
            BigDecimal newPrice = updateExist.getIdCtsp().getGiaThucTe().multiply(new BigDecimal(newQuantity));
            updateExist.setDonGia(newPrice);
            hoadonchitietRepository.save(updateExist);

            // Update price in hd
            List<HoaDonChiTiet> hoaDonChiTiets2 = hoadonchitietRepository.findAllByIdHdANDTT(add.getIdHd().getIdHd(), 0);

            BigDecimal tongTien = BigDecimal.ZERO;

            for (HoaDonChiTiet x : hoaDonChiTiets2) {
                // UPdate price in hd
                tongTien = tongTien.add(x.getDonGia());
                System.out.println("tongTien: " + tongTien);
            }
            HoaDon hoaDon = hoadonRepo.findById(add.getIdHd().getIdHd()).orElseThrow();
            hoaDon.setTongTien(tongTien);
            System.out.println("tongTien: " + tongTien);

            if (hoaDon.getSoTienGiamGia() == null) {
                hoaDon.setSoTienGiamGia(BigDecimal.ZERO);
            }
            if (hoaDon.getTienShip() == null) {
                hoaDon.setTienShip(BigDecimal.ZERO);
            }
            BigDecimal thanhTien = tongTien.add(hoaDon.getTienShip()).subtract(hoaDon.getSoTienGiamGia());
            hoaDon.setThanhTien(thanhTien);
            return ResponseEntity.ok(hoadonRepo.save(hoaDon));

        }

    }


    @Override
    public ResponseEntity<?> add(HoaDonChiTiet add) {

        HoaDon hoaDon = hoadonRepo.findById(add.getIdHd().getIdHd()).orElseThrow();
        if (hoaDon.getTrangThai() < 8) {
            addLS(add, 1);
            return updateHoaDonChiTiet(add);
        } else {
//            List<HoaDonChiTiet> hoaDonChiTiets1 =
            return updateHoaDonChiTiet(add);
        }
    }

    @Override
    public HoaDonChiTiet add1(HoaDonChiTiet add) {
        return hoadonchitietRepository.save(add);
    }

    public void updatePriceAnDelete(HoaDonChiTiet detailHDCT) {
        HoaDon hoaDon = hoadonRepo.findById(detailHDCT.getIdHd().getIdHd()).orElseThrow();

        BigDecimal tongTien = BigDecimal.ZERO;
        List<HoaDonChiTiet> hoaDonChiTiets2 = hoadonchitietRepository.findAllByIdHdANDTT(detailHDCT.getIdHd().getIdHd(), 0);

        for (HoaDonChiTiet x : hoaDonChiTiets2) {
            tongTien = tongTien.add(x.getDonGia());
        }

        hoaDon.setTongTien(tongTien);
        System.out.println("tongTien: " + tongTien);

        if (hoaDon.getSoTienGiamGia() == null) {
            hoaDon.setSoTienGiamGia(BigDecimal.ZERO);
        }
        if (hoaDon.getTienShip() == null) {
            hoaDon.setTienShip(BigDecimal.ZERO);
        }
        BigDecimal thanhTien = tongTien.add(hoaDon.getTienShip()).subtract(hoaDon.getSoTienGiamGia());
        hoaDon.setThanhTien(thanhTien);

        hoadonRepo.save(hoaDon);
    }

    @Override
    public void delete(Integer id) {
        HoaDonChiTiet detailHDCT = detail(id).orElseThrow();
        if (detailHDCT.getIdHd().getTrangThai() < 8) {
            // Add to history and delete
            addLS(detailHDCT, 2);
            hoadonchitietRepository.deleteById(id);
            // Update price
            updatePriceAnDelete(detailHDCT);

        } else {
            // Delete
            hoadonchitietRepository.deleteById(id);
            // Update price
            updatePriceAnDelete(detailHDCT);

        }
    }

    @Override
    public Boolean checkExists(Integer id) {
        return hoadonchitietRepository.existsById(id);
    }

    public void updatePriceAndUpate(HoaDonChiTiet detailHDCT) {
        HoaDon hoaDon = hoadonRepo.findById(detailHDCT.getIdHd().getIdHd()).orElseThrow();
        BigDecimal tongTien = BigDecimal.ZERO;
        List<HoaDonChiTiet> hoaDonChiTiets1 = hoadonchitietRepository.findAllByIdCtspExsit(detailHDCT.getIdHd().getIdHd(), detailHDCT.getIdCtsp().getIdCtsp());

        if (hoaDonChiTiets1.isEmpty()) {
            hoadonchitietRepository.save(detailHDCT);

            List<HoaDonChiTiet> hoaDonChiTiets2 = hoadonchitietRepository.findAllByIdHdANDTT(detailHDCT.getIdHd().getIdHd(), 0);

            for (HoaDonChiTiet x : hoaDonChiTiets2) {
                tongTien = tongTien.add(x.getDonGia());
            }

            hoaDon.setTongTien(tongTien);
            System.out.println("tongTien: " + tongTien);

            if (hoaDon.getSoTienGiamGia() == null) {
                hoaDon.setSoTienGiamGia(BigDecimal.ZERO);
            }
            if (hoaDon.getTienShip() == null) {
                hoaDon.setTienShip(BigDecimal.ZERO);
            }
            BigDecimal thanhTien = tongTien.add(hoaDon.getTienShip()).subtract(hoaDon.getSoTienGiamGia());
            hoaDon.setThanhTien(thanhTien);

            hoadonRepo.save(hoaDon);
        } else {
            hoadonchitietRepository.save(detailHDCT);
            List<HoaDonChiTiet> hoaDonChiTiets2 = hoadonchitietRepository.findAllByIdHdANDTT(detailHDCT.getIdHd().getIdHd(), 0);

            for (HoaDonChiTiet x : hoaDonChiTiets2) {
                // UPdate price in hd
                tongTien = tongTien.add(x.getDonGia());
                System.out.println("tongTien: " + tongTien);
            }
            hoaDon.setTongTien(tongTien);

            if (hoaDon.getSoTienGiamGia() == null) {
                hoaDon.setSoTienGiamGia(BigDecimal.ZERO);
            }
            if (hoaDon.getTienShip() == null) {
                hoaDon.setTienShip(BigDecimal.ZERO);
            }
            BigDecimal thanhTien = tongTien.add(hoaDon.getTienShip()).subtract(hoaDon.getSoTienGiamGia());
            hoaDon.setThanhTien(thanhTien);
            hoadonRepo.save(hoaDon);
        }

    }

    @Override
    public ResponseEntity<?> update(HoaDonChiTiet update) {
//        List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietRepository.findAllByIdCtspExsit(update.getIdHd().getIdHd(), update.getIdCtsp().getIdCtsp());
//
        HoaDon hoaDon = hoadonRepo.findById(update.getIdHd().getIdHd()).orElseThrow();
        if (hoaDon.getTrangThai() < 8) {
//            hoadonchitietRepository.save(update);
            updatePriceAndUpate(update);
            addLS(update, 3);
            return ResponseEntity.ok("Chỉnh Sửa Hóa Đơn Chi Tiết và Lưu Vào Lịch Sử");

        } else {
//            hoadonchitietRepository.save(update);
            updatePriceAndUpate(update);
            return ResponseEntity.ok("Chỉnh Sửa Hóa Đơn Chi Tiết");

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