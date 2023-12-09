//package com.example.fullstackbackend.config;
//
//import com.example.fullstackbackend.entity.HoaDon;
//import com.example.fullstackbackend.entity.HoaDonChiTiet;
//import com.example.fullstackbackend.entity.LichSuHoaDon;
//import com.example.fullstackbackend.repository.HoadonRepository;
//import com.example.fullstackbackend.repository.HoadonchitietRepository;
//import com.example.fullstackbackend.repository.LichSuHoaDonRepository;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//@Component
//@EnableScheduling
//@RequiredArgsConstructor
//public class ConfigDeleteStatusHD11 {
//
//    private final HoadonRepository hoaDonRepo;
//
//    private final LichSuHoaDonRepository lichSuHoaDonRepo;
//
//    private final HoadonchitietRepository hoadonchitietRepo;
//
//    @Scheduled(cron = "0 0 * * * *", zone = "Asia/Ho_Chi_Minh")
//    @Transactional//
//    public void updateDiscount() {
//        List<HoaDon> hoaDonList = hoaDonRepo.findAllByTrangThai(11);
//        List<LichSuHoaDon> lichSuHoaDons = lichSuHoaDonRepo.findAllByIdHd_TrangThai(11);
//        List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietRepo.findAllByIdHd_TrangThai(11);
//
//        for (LichSuHoaDon x :
//                lichSuHoaDons) {
//            lichSuHoaDonRepo.deleteById(x.getIdLshd());
//
//        }
//
//        for (HoaDonChiTiet x :
//                hoaDonChiTiets) {
//            hoadonchitietRepo.deleteById(x.getIdHdct());
//
//        }
//
//        for (HoaDon x :
//                hoaDonList) {
//            hoaDonRepo.deleteById(x.getIdHd());
//        }
//    }
//
//
//}
