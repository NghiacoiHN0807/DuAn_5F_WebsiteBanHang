package com.example.fullstackbackend.config;

import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.repository.HoadonRepository;
import com.example.fullstackbackend.repository.HoadonchitietRepository;
import com.example.fullstackbackend.repository.LichSuHoaDonRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class ConfigDeleteStatusHD11 {

    private final HoadonRepository hoaDonRepo;

    private final LichSuHoaDonRepository lichSuHoaDonRepo;

    private final HoadonchitietRepository hoadonchitietRepo;

    @Scheduled(cron = "0 */15 * * * *", zone = "Asia/Ho_Chi_Minh")
    @Transactional//
    public void updateDiscount() {
        List<HoaDon> hoaDonList = hoaDonRepo.findAllByTrangThai(11);


        for (HoaDon x :
                hoaDonList) {
            Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
            long fifteenMinutesInMillis = 15 * 60 * 1000;
            long diffInMillis = currentTimestamp.getTime() - x.getNgayTao().getTime();

            if (diffInMillis >= fifteenMinutesInMillis){
                List<LichSuHoaDon> lichSuHoaDons = lichSuHoaDonRepo.findAllByIdHd_TrangThai(x.getIdHd(),11);

                for (LichSuHoaDon y :
                        lichSuHoaDons) {
                    lichSuHoaDonRepo.deleteById(y.getIdLshd());

                }
                List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietRepo.findAllByIdHd_TrangThai(x.getIdHd(),11);

                for (HoaDonChiTiet z :
                        hoaDonChiTiets) {
                    hoadonchitietRepo.deleteById(z.getIdHdct());

                }
                hoaDonRepo.deleteById(x.getIdHd());
            }

        }
    }


}
