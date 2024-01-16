package com.example.fullstackbackend.config;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.Coupons;
import com.example.fullstackbackend.entity.GiamGia;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import com.example.fullstackbackend.entity.GioHangChiTiet;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.ChitietsanphamRepository;
import com.example.fullstackbackend.repository.CouponsRepository;
import com.example.fullstackbackend.repository.GiamGiaChiTietRepository;
import com.example.fullstackbackend.repository.GiamGiaRepository;
import com.example.fullstackbackend.repository.GioHangChiTietReponsitory;
import com.example.fullstackbackend.repository.HoadonRepository;
import com.example.fullstackbackend.repository.HoadonchitietRepository;
import com.example.fullstackbackend.services.GiamGiaChiTietService;
import com.example.fullstackbackend.services.SanPhamService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class DiscountUpdater {

    private final GiamGiaRepository giamGiaRepository;

    private final GiamGiaChiTietRepository giamGiaChiTietRepository;

    private final GiamGiaChiTietService giamGiaChiTietService;

    private final CouponsRepository couponsRepository;

    private final SanPhamService sanPhamService;

    private final GioHangChiTietReponsitory gioHangChiTietReponsitory;

    private final ChitietsanphamRepository chitietsanphamRepository;

    private final HoadonchitietRepository hoadonchitietRepository;

    private final HoadonRepository hoadonRepo;


    public void updateQuantityWhenSale() {
        // Update price on cart's client
        List<GioHangChiTiet> gioHangChiTiet = gioHangChiTietReponsitory.findAll();

        for (GioHangChiTiet x :
                gioHangChiTiet) {
            ChiTietSanPham chiTietSanPham = chitietsanphamRepository.findById(x.getIdCtsp().getIdCtsp()).orElseThrow();
            x.setIdGhct(x.getIdGhct());
            BigDecimal newPrice = chiTietSanPham.getGiaThucTe().multiply(new BigDecimal(x.getSoLuong()));
            x.setDonGia(newPrice);
            x.setDonGiaSauGiam(newPrice);
            gioHangChiTietReponsitory.save(x);
        }
        // Update price on cart's admin
        List<HoaDon> hoaDonList = hoadonRepo.findAllByTrangThai(8);
        BigDecimal tongTien = BigDecimal.ZERO;

        for (HoaDon y :
                hoaDonList) {
            List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietRepository.findAllByIdHdANDTT(y.getIdHd(), 0);
            for (HoaDonChiTiet x :
                    hoaDonChiTiets) {
                ChiTietSanPham chiTietSanPham = chitietsanphamRepository.findById(x.getIdCtsp().getIdCtsp()).orElseThrow();
                x.setIdHdct(x.getIdHdct());
                BigDecimal newPrice = chiTietSanPham.getGiaThucTe().multiply(new BigDecimal(x.getSoLuong()));
                x.setDonGia(newPrice);
                tongTien = tongTien.add(newPrice);
                hoadonchitietRepository.save(x);
            }
            y.setTongTien(tongTien);
            if (y.getSoTienGiamGia() == null) {
                y.setSoTienGiamGia(BigDecimal.ZERO);
            }
            if (y.getTienShip() == null) {
                y.setTienShip(BigDecimal.ZERO);
            }
            BigDecimal thanhTien = tongTien.add(y.getTienShip()).subtract(y.getSoTienGiamGia());
            y.setThanhTien(thanhTien);
            hoadonRepo.save(y);
        }
    }

    @Scheduled(cron = "0 * * * * *", zone = "Asia/Ho_Chi_Minh")
    @Transactional
    public void updateDiscount() {
        List<GiamGia> giamGias = giamGiaRepository.findAll();

        List<Coupons> coupons = couponsRepository.findAll();

        Date now = new Date();

        Date currentTimestamp = new Date(now.getTime());

        boolean tatCaLaTrangThai0 = true;


        for (GiamGia giamGia : giamGias) {
            Date ngayKetThuc = giamGia.getNgayKetThuc();
            if (ngayKetThuc != null && currentTimestamp.after(ngayKetThuc)) {
                List<GiamGiaChiTiet> giamGiaChiTietList = giamGiaChiTietRepository.findByIdGiamGia(giamGia.getIdGiamGia());

                for (GiamGiaChiTiet giamGiaChiTiet : giamGiaChiTietList) {
                    Integer idSp = giamGiaChiTiet.getIdSp().getIdSp();
                    SanPham sanPham = sanPhamService.detail(idSp).orElseThrow();
                    sanPham.setTrangThai(0);
                    sanPhamService.add(sanPham);
                    giamGiaChiTietRepository.updateCtsp(giamGiaChiTiet.getIdSp().getIdSp());
                    giamGiaChiTietRepository.updateTrangThaiGiamGia(10, giamGia.getIdGiamGia());
                    giamGiaChiTietRepository.updateTrangThaiGiamGiaChiTiet(10, giamGia.getIdGiamGia(), 0);
                    giamGiaChiTietRepository.deleteById(giamGiaChiTiet.getIdGgct());
                }

                for (GiamGiaChiTiet x : giamGiaChiTietList) {
                    if (x.getTrangThai() != 10) {
                        tatCaLaTrangThai0 = false;
                        break; // Có ít nhất một phần tử không có trạng thái 10, dừng kiểm tra
                    }
                }
                // Kiểm tra nếu tất cả đều có trạng thái 10
                if (tatCaLaTrangThai0) {
                    giamGia.setTrangThai(10);
                    giamGiaRepository.save(giamGia);
                    // Thực hiện câu lệnh khi tất cả đều có trạng thái 10
                    // Ví dụ: System.out.println("Tất cả có trạng thái 10");
                }
                //Update price
                updateQuantityWhenSale();
            }
        }

        for (Coupons coupon : coupons) {
            Date ngayKetThuc = coupon.getThoiGianKetThuc();
            Date ngayBatDau = coupon.getThoiGianTao();
            if (ngayBatDau != null && currentTimestamp.after(ngayBatDau)) {
                coupon.setTrangThai(0);
                couponsRepository.save(coupon);
            }
            if (ngayKetThuc != null && currentTimestamp.after(ngayKetThuc)) {
                coupon.setTrangThai(10);
                couponsRepository.save(coupon);
            }
        }


    }

    @Scheduled(cron = "0 * * * * *", zone = "Asia/Ho_Chi_Minh")
    @Transactional
    public void updateDiscount1() {
        List<GiamGia> giamGias = giamGiaRepository.findAll();

        Date now = new Date();

        boolean tatCaLaTrangThai0 = true;

        for (GiamGia giamGia : giamGias) {
            Date ngayBatDau = giamGia.getNgayBatDau();
            if (ngayBatDau != null && ngayBatDau.before(now)) {
                List<GiamGiaChiTiet> giamGiaChiTietList = giamGiaChiTietRepository.findByIdGiamGia(giamGia.getIdGiamGia());

                for (GiamGiaChiTiet giamGiaChiTiet : giamGiaChiTietList) {
                    Integer idSp = giamGiaChiTiet.getIdSp().getIdSp();
                    SanPham sanPham = sanPhamService.detail(idSp).orElseThrow();
                    sanPham.setTrangThai(1);
                    sanPhamService.add(sanPham);
                    giamGiaChiTietRepository.updateTrangThaiGiamGia(0, giamGia.getIdGiamGia());
                    giamGiaChiTietRepository.updateTrangThaiGiamGiaChiTiet(0, giamGia.getIdGiamGia(), 1);
                    giamGiaChiTietService.updateGiaThuc(idSp);
                }

                for (GiamGiaChiTiet x : giamGiaChiTietList) {
                    if (x.getTrangThai() != 10) {
                        tatCaLaTrangThai0 = false;
                        break; // Có ít nhất một phần tử không có trạng thái 10, dừng kiểm tra
                    }
                }
                // Kiểm tra nếu tất cả đều có trạng thái 10
                if (!tatCaLaTrangThai0) {
                    giamGia.setTrangThai(0);
                    giamGiaRepository.save(giamGia);
                    // Thực hiện câu lệnh khi tất cả đều có trạng thái 10
                    // Ví dụ: System.out.println("Tất cả có trạng thái 10");
                }
                //Update price
                updateQuantityWhenSale();
            }
        }

    }

}
