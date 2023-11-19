package com.example.fullstackbackend.config;

import com.example.fullstackbackend.entity.GiamGia;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.GiamGiaChiTietRepository;
import com.example.fullstackbackend.repository.GiamGiaRepository;
import com.example.fullstackbackend.services.GiamGiaChiTietService;
import com.example.fullstackbackend.services.SanPhamService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class DiscountUpdater {

    private final GiamGiaRepository giamGiaRepository;

    private final GiamGiaChiTietRepository giamGiaChiTietRepository;

    private final GiamGiaChiTietService giamGiaChiTietService;

    private final SanPhamService sanPhamService;

    @Scheduled(cron = "0 0 * * * *", zone = "Asia/Ho_Chi_Minh")
    @Transactional
    public void updateDiscount() {
        List<GiamGia> giamGias = giamGiaRepository.findAll();

        Date now = new Date();
        Date currentTimestamp = new Date(now.getTime());

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
                    giamGiaChiTietRepository.updateTrangThaiGiamGiaChiTiet(10, giamGia.getIdGiamGia());
                }
            }
        }
    }


}
