package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.repository.HoadonRepository;
import com.example.fullstackbackend.repository.HoadonchitietRepository;
import com.example.fullstackbackend.repository.LichSuHoaDonRepository;
import com.example.fullstackbackend.services.HoadonSevice;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class HoadonServiceImpl implements HoadonSevice {

    @Autowired
    private HoadonRepository hoadonRepository;

    @Autowired
    private HoadonchitietRepository hoadonchitietRepo;

    @Autowired
    private LichSuHoaDonRepository lichSuHoaDonRepo;
    Timestamp currentTimestamp;


    @Override
    public List<HoaDon> getAll() {
        return hoadonRepository.findAll();
    }

    @Override
    public Page<HoaDon> hoaDonPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return hoadonRepository.findAll(pageable);
    }

    @Override
    public List<HoaDon> hoaDonOffline() {
        return hoadonRepository.pageOfflineInvoice();
    }

    @Override
    public List<HoaDon> selectAllInvoiceWaiting() {
        return hoadonRepository.selectAllInvoiceWaiting();
    }

    @Override
    public List<HoaDon> hoaDonOnline() {
        return hoadonRepository.pageOnlineInvoice();
    }

    @Override
    public List<HoaDon> findAllByIDKH(Integer idKH) {
        return hoadonRepository.findAllByIdKH_IdTaiKhoan(idKH);
    }

    @Override
    public HoaDon add(HoaDon add) {
        List<HoaDon> allHoaDon = getAll();
        // Get datetime now
        java.util.Date currentDate = new java.util.Date();
        currentTimestamp = new Timestamp(currentDate.getTime());

        if (!allHoaDon.isEmpty()) {

            String maxMaHd = getAll().stream()
                    .map(HoaDon::getMaHd)
                    .filter(s -> s.matches("HD\\d+")) // Lọc ra các chuỗi có định dạng "HD" và theo sau là số.
                    .map(s -> Integer.parseInt(s.replaceAll("HD0*", ""))) // Loại bỏ các số 0 ở đầu và chuyển thành số nguyên.
                    .max(Integer::compareTo) // Tìm số lớn nhất.
                    .map(maxNumber -> String.format("HD%06d", maxNumber)) // Định dạng lại thành chuỗi "HDxxxxxx".
                    .orElse("HD000000");
            System.out.println("maxMaHd: " + maxMaHd);

            // Get the current number
            String currentNumber = maxMaHd.substring(2);
            System.out.println("currentNumber: " + currentNumber);
            int number = Integer.parseInt(currentNumber);
            System.out.println("number: " + number);
            number++;

            String newNumber = String.format("HD%06d", number);
            System.out.println("newNumber: " + newNumber);

            add.setMaHd(newNumber);
            add.setNgayTao(currentTimestamp);
            return hoadonRepository.save(add);
        } else {
            add.setMaHd("HD000001");
            add.setNgayTao(currentTimestamp);
            return hoadonRepository.save(add);
        }
    }

    @Override
    public void delete(Integer id) {
        hoadonRepository.delete(id);
    }

    @Override
    public void deleteHDOver(Integer idHd) {
        List<HoaDon> hoaDonList = hoadonRepository.findAllByIDAndTrangThai(idHd, 11);
        for (HoaDon x :
                hoaDonList) {
            List<LichSuHoaDon> lichSuHoaDons = lichSuHoaDonRepo.findAllByIdHd_TrangThai(x.getIdHd(), 11);

            for (LichSuHoaDon y :
                    lichSuHoaDons) {
                lichSuHoaDonRepo.deleteById(y.getIdLshd());

            }
            List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietRepo.findAllByIdHd_TrangThai(x.getIdHd(), 11);

            for (HoaDonChiTiet z :
                    hoaDonChiTiets) {
                hoadonchitietRepo.deleteById(z.getIdHdct());

            }
            hoadonRepository.deleteById(x.getIdHd());


        }
    }

    @Override
    public Boolean checkExists(Integer id) {
        return hoadonRepository.existsById(id);
    }

    @Override
    public HoaDon update(HoaDon update) {
        return hoadonRepository.save(update);
    }

//    @Override
//    public HoaDon updatePaymentClient(Integer idHd, HoaDon update) {
//        return hoadonRepository.save(update);
//    }

    @Override
    public Optional<HoaDon> detail(Integer id) {
        return hoadonRepository.findById(id);

    }

    @Override
    public HoaDon finByMaHD(Integer maHD) {
        return hoadonRepository.findByMaHd(maHD);

    }

    @Override
    public HoaDon updatePaymentOnline(Integer idHd, HoaDon hoaDonDTO) {
        HoaDon hoaDon = hoadonRepository.findById(idHd).orElseThrow(() -> new EntityNotFoundException("HoaDonNotFound"));

        hoaDon.setNgayThanhToan(hoaDonDTO.getNgayThanhToan());
        hoaDon.setTienDua(hoaDonDTO.getTienDua());
        hoaDon.setTrangThai(hoaDonDTO.getTrangThai());

        return hoadonRepository.save(hoaDon);
    }

    @Override
    public Double calculateTotalTongTien() {
        Double total = hoadonRepository.calculateTotalTongTien();
        if (total == null) {
            return 0.0;
        }
        return total;
    }

    @Override
    public Long totalInvoice() {
        return hoadonRepository.totalInvoice();
    }

    public List<Object[]> getTotalRevenueByDay() {
        return hoadonRepository.getTotalRevenueByDay();
    }

    @Override
    public Double getTyLeTraHang() {
        return hoadonRepository.getTyLeTraHang();
    }

    @Override
    public Long tongSpDaban() {
        return hoadonRepository.getTongSpBan();
    }


}
