package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.DTO.HoaDonDTO;
import com.example.fullstackbackend.DTO.VNPayService;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.HoadonSevice;
import com.example.fullstackbackend.services.LichSuHoaDonService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hoa-don/")
@CrossOrigin("http://localhost:3000/")
public class HoaDonController {
    @Autowired
    private HoadonSevice hoadonSevice;

    @Autowired
    private VNPayService vnPayService;

    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;

    @GetMapping("view-all")
    public Page<HoaDon> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "15") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        Page<HoaDon> hoaDons = hoadonSevice.hoaDonPage(p.orElse(page), size);
        return hoaDons;
    }

    @GetMapping("view-all-offline-invoice")
    public Page<HoaDon> viewOffline(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "15") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        Page<HoaDon> hoaDons = hoadonSevice.hoaDonOffline(p.orElse(page), size);
        return hoaDons;
    }

    @GetMapping("view-all-invoice-waiting")
    public List<HoaDon> selectAllInvoiceWaiting() {
        List<HoaDon> hoaDons = hoadonSevice.selectAllInvoiceWaiting();
        return hoaDons;
    }

        @GetMapping("view-all-online-invoice")
    public Page<HoaDon> viewAllOnlineInvoice(@RequestParam(defaultValue = "0") Integer page,
                                             @RequestParam(defaultValue = "15") Integer size,
                                             @RequestParam("p") Optional<Integer> p) {
        Page<HoaDon> hoaDons = hoadonSevice.hoaDonOnline(p.orElse(page), size);
        return hoaDons;
    }

    @PostMapping("add")
    public HoaDon add(@Valid @RequestBody HoaDon newHD, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            HoaDon hoaDon = hoadonSevice.add(newHD);
            //Add to history bill

            // Lấy ngày giờ hiện tại
            java.util.Date currentDate = new java.util.Date();
            // Chuyển đổi thành Timestamp
            Timestamp currentTimestamp = new Timestamp(currentDate.getTime());

            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHd(hoaDon);
            lichSuHoaDon.setIdTk(hoaDon.getIdTK());
            lichSuHoaDon.setTrangThai(hoaDon.getTrangThai());
            lichSuHoaDon.setMoTa("Tạo Hóa Đơn Thành Công");
            lichSuHoaDon.setNgayThayDoi(currentTimestamp);
            lichSuHoaDonService.add(lichSuHoaDon);

            return hoaDon;
        }
    }

    @GetMapping("detail/{id}")
    public HoaDon detail(@PathVariable("id") Integer id) {
        HoaDon findHDCT = hoadonSevice.detail(id).
                orElseThrow(() -> new xuatXuNotFoundException(id));
        return findHDCT;
    }

    @GetMapping("findByMaHD/{id}")
    public HoaDon finByMaHD(@PathVariable("id") Integer id) {
        HoaDon findID = hoadonSevice.finByMaHD(id);
        return findID;
    }

    @PutMapping("update/{id}")
    public HoaDon update(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setIdTK(newHD.getIdTK());
            hoaDon.setMaHd(newHD.getMaHd());
            hoaDon.setNgayTao(newHD.getNgayTao());
            hoaDon.setNgayThanhToan(newHD.getNgayThanhToan());
            hoaDon.setSoTienGiamGia(newHD.getSoTienGiamGia());
            hoaDon.setThanhTien(newHD.getThanhTien());
            hoaDon.setTienDua(newHD.getTienDua());
            hoaDon.setTienThua(newHD.getTienThua());
            hoaDon.setTienShip(newHD.getTienShip());
            hoaDon.setTongTien(newHD.getTongTien());
            hoaDon.setTenKh(newHD.getTenKh());
            hoaDon.setSdtKh(newHD.getSdtKh());
            hoaDon.setTenShip(newHD.getTenShip());
            hoaDon.setSdtShip(newHD.getSdtShip());
            hoaDon.setDiaChi(newHD.getDiaChi());
            hoaDon.setNgayDuTinhNhan(newHD.getNgayDuTinhNhan());
            hoaDon.setNgayBatDauGiao(newHD.getNgayBatDauGiao());
            hoaDon.setNgayGiaoThanhCong(newHD.getNgayGiaoThanhCong());
            hoaDon.setTrangThai(newHD.getTrangThai());
            return hoadonSevice.add(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));
        return newHD1;
    }
    @PutMapping("update-status/{id}")
    public HoaDon updateStatus(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setTrangThai(newHD.getTrangThai());
            return hoadonSevice.add(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));
        return newHD1;
    }

    @PutMapping("update-payment/{id}")
    public HoaDon updateThanhToan(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setTenKh(newHD.getTenKh());
            hoaDon.setSdtKh(newHD.getSdtKh());
            hoaDon.setNgayThanhToan(newHD.getNgayThanhToan());
            hoaDon.setThanhTien(newHD.getThanhTien());
            hoaDon.setTienDua(newHD.getTienDua());
            hoaDon.setTienThua(newHD.getTienThua());
            hoaDon.setKieuHoaDon(newHD.getKieuHoaDon());
            hoaDon.setTrangThai(newHD.getTrangThai());
            return hoadonSevice.add(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));
        return newHD1;
    }

    @PutMapping("update-ship-online/{id}")
    public HoaDon updateShipOnline(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setTenKh(newHD.getTenKh());
            hoaDon.setSdtKh(newHD.getSdtKh());
            hoaDon.setNgayThanhToan(newHD.getNgayThanhToan());
            hoaDon.setDiaChi(newHD.getDiaChi());
            hoaDon.setThanhTien(newHD.getThanhTien());
            hoaDon.setKieuHoaDon(newHD.getKieuHoaDon());
            hoaDon.setTrangThai(newHD.getTrangThai());
            return hoadonSevice.add(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));
        return newHD1;
    }


    @PostMapping("submitOrder")
    public String submidOrder(@RequestParam("amount") BigDecimal orderTotal,
                              @RequestParam("orderInfo") String orderInfo,
                              HttpServletRequest request){
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        return vnpayUrl;
    }

        @GetMapping("vnpay-payment")
        public ResponseEntity<String> GetMapping(HttpServletRequest request, HttpServletResponse response) throws IOException {

            String orderInfo = request.getParameter("vnp_OrderInfo");
            String totalPrice = request.getParameter("vnp_Amount");
            BigDecimal realPrice = new BigDecimal(totalPrice).divide(new BigDecimal(100));

            HoaDon hoaDonDTO1 = new HoaDon();
            hoaDonDTO1.setNgayThanhToan(LocalDate.now());
            hoaDonDTO1.setTienDua(realPrice);
            hoaDonDTO1.setTrangThai(9);

            Integer idHd= Integer.valueOf(orderInfo);

            HoaDon hoaDon = hoadonSevice.updatePaymentOnline(idHd, hoaDonDTO1);
            //Add to history bill

            // Lấy ngày giờ hiện tại
            java.util.Date currentDate = new java.util.Date();
            // Chuyển đổi thành Timestamp
            Timestamp currentTimestamp = new Timestamp(currentDate.getTime());

            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHd(hoaDon);
            lichSuHoaDon.setIdTk(hoaDonDTO1.getIdTK());
            lichSuHoaDon.setTrangThai(hoaDonDTO1.getTrangThai());
            lichSuHoaDon.setMoTa("Thanh Toán Thành Công");
            lichSuHoaDon.setNgayThayDoi(currentTimestamp);
            lichSuHoaDonService.add(lichSuHoaDon);

            // Switch tab
            response.sendRedirect("http://localhost:3000/order-management-timeline/" + idHd);

            return ResponseEntity.ok("Thanh Toán Online Thành Công!!!");
        }

    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        if (!hoadonSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            hoadonSevice.delete(id);
        }
    }


}
