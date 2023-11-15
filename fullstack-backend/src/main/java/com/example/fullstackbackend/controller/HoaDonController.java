package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.DTO.VNPayService;
import com.example.fullstackbackend.entity.HinhThucThanhToan;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.HinhThucThanhToanSevice;
import com.example.fullstackbackend.services.HoadonSevice;
import com.example.fullstackbackend.services.LichSuHoaDonService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @Autowired
    private HinhThucThanhToanSevice hinhThucThanhToanSevice;

    // get datetimenow
    java.util.Date currentDate = new java.util.Date();
    // Chuyển đổi thành Timestamp
    Timestamp currentTimestamp = new Timestamp(currentDate.getTime());

    @GetMapping("view-all")
    public Page<HoaDon> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "10") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        return hoadonSevice.hoaDonPage(p.orElse(page), size);
    }

    @GetMapping("view-all-offline-invoice")
    public List<HoaDon> viewOffline() {
        return hoadonSevice.hoaDonOffline();
    }

    @GetMapping("view-all-invoice-waiting")
    public List<HoaDon> selectAllInvoiceWaiting() {
        return hoadonSevice.selectAllInvoiceWaiting();
    }

    @GetMapping("view-all-online-invoice")
    public List<HoaDon> viewAllOnlineInvoice() {
        return hoadonSevice.hoaDonOnline();
    }

    @PostMapping("add")
    public HoaDon add(@Valid @RequestBody HoaDon newHD, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            HoaDon hoaDon = hoadonSevice.add(newHD);
            //Add to history bill
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
        return hoadonSevice.detail(id).
                orElseThrow(() -> new xuatXuNotFoundException(id));

    }

    @GetMapping("findByMaHD/{id}")
    public HoaDon finByMaHD(@PathVariable("id") Integer id) {
        return hoadonSevice.finByMaHD(id);
    }

    @PutMapping("update/{id}")
    public HoaDon update(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        return hoadonSevice.detail(id).map(hoaDon -> {
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
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));
    }

    @PutMapping("update-status/{id}")
    public HoaDon updateStatus(@RequestBody HoaDon newHD, @PathVariable("id") Integer id,
                               @RequestParam String moTa) {
        HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setTrangThai(newHD.getTrangThai());
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));

        //Add to history bill


        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHd(newHD1);
        lichSuHoaDon.setIdTk(newHD1.getIdTK());
        lichSuHoaDon.setTrangThai(newHD1.getTrangThai());
        lichSuHoaDon.setMoTa(moTa);
        lichSuHoaDon.setNgayThayDoi(currentTimestamp);
        lichSuHoaDonService.add(lichSuHoaDon);
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
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));

        //Add to payments
        HinhThucThanhToan hinhThucThanhToan2 = new HinhThucThanhToan();
        hinhThucThanhToan2.setIdHd(newHD1);
        hinhThucThanhToan2.setHinhThuc("Thanh Toán Tiền Mặt");
        hinhThucThanhToan2.setSoTien(newHD1.getThanhTien());
        hinhThucThanhToan2.setMoTa("Thanh Toán Tiền Mặt");
        hinhThucThanhToan2.setTrangThai(0);
        hinhThucThanhToanSevice.add(hinhThucThanhToan2);

        //Add to history bill
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHd(newHD1);
        lichSuHoaDon.setIdTk(newHD1.getIdTK());
        lichSuHoaDon.setTrangThai(newHD1.getTrangThai());
        lichSuHoaDon.setMoTa("Thanh Toán Thành Công");
        lichSuHoaDon.setNgayThayDoi(currentTimestamp);
        lichSuHoaDonService.add(lichSuHoaDon);

        return newHD1;
    }

    @PutMapping("update-ship-online/{id}")
    public HoaDon updateShipOnline(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
//        int paymentStatus = vnPayService.orderReturn(request);

        HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setTenKh(newHD.getTenKh());
            hoaDon.setSdtKh(newHD.getSdtKh());
            hoaDon.setNgayThanhToan(newHD.getNgayThanhToan());
            hoaDon.setDiaChi(newHD.getDiaChi());
            hoaDon.setThanhTien(newHD.getThanhTien());
            hoaDon.setKieuHoaDon(newHD.getKieuHoaDon());
            hoaDon.setTrangThai(newHD.getTrangThai());
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));

        //Add to history bill
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHd(newHD1);
        lichSuHoaDon.setIdTk(newHD1.getIdTK());
        lichSuHoaDon.setTrangThai(newHD1.getTrangThai());
        lichSuHoaDon.setMoTa("Tạo Đơn Hàng Ship Thành Công");
        lichSuHoaDon.setNgayThayDoi(currentTimestamp);
        lichSuHoaDonService.add(lichSuHoaDon);
        return newHD1;
    }

    @PutMapping("update-tong-tien/{id}")
    public HoaDon updateTongTien(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        return hoadonSevice.detail(id).map(hoaDon -> {
//            BigDecimal thanhTien =  newHD.getTongTien().subtract(newHD.getSoTienGiamGia()).add(newHD.getTienShip());
            hoaDon.setTongTien(newHD.getTongTien());
            hoaDon.setThanhTien(newHD.getTongTien());
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));
    }

    @PutMapping("update-khach-hang/{id}")
    public HoaDon updateKhachHang(@RequestBody TaiKhoan newTK, @PathVariable("id") Integer id) {
        return hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setIdKH(newTK);
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));

    }

    @PostMapping("submitOrder")
    public String submidOrder(@RequestParam("amount") BigDecimal orderTotal,
                              @RequestParam("orderInfo") String orderInfo,
                              HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        return vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
    }

    @GetMapping("vnpay-payment")
    public ResponseEntity<String> GetMapping(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int paymentStatus = vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String totalPrice = request.getParameter("vnp_Amount");
        BigDecimal realPrice = new BigDecimal(totalPrice).divide(new BigDecimal(100));
        Integer idHd = Integer.valueOf(orderInfo);

        if (paymentStatus == 1) {
            //Detail HD by IdHd
            Optional<HoaDon> getOne = hoadonSevice.detail(idHd);
            BigDecimal getTongTien = getOne.get().getTongTien();

            BigDecimal tienMat = getTongTien.subtract(realPrice);
            //Add to updatePaymentOnline
            HoaDon hoaDonDTO1 = new HoaDon();
            hoaDonDTO1.setNgayThanhToan(LocalDate.now());
            hoaDonDTO1.setTienDua(realPrice);
            int setTrangThai;
            if (getOne.get().getTrangThai() == 3) {
                setTrangThai = 4;
            } else {
                setTrangThai = 9;
            }
            hoaDonDTO1.setTrangThai(setTrangThai);
            HoaDon hoaDon = hoadonSevice.updatePaymentOnline(idHd, hoaDonDTO1);

            // Add to payments
            HinhThucThanhToan hinhThucThanhToan1 = new HinhThucThanhToan();
            hinhThucThanhToan1.setIdHd(hoaDon);
            hinhThucThanhToan1.setHinhThuc("Thanh Toán Online");
            hinhThucThanhToan1.setSoTien(realPrice);
            hinhThucThanhToan1.setMoTa("Thanh Toán Online");
            hinhThucThanhToan1.setTrangThai(0);

            HinhThucThanhToan hinhThucThanhToan2 = new HinhThucThanhToan();
            hinhThucThanhToan2.setIdHd(hoaDon);
            hinhThucThanhToan2.setHinhThuc("Thanh Toán Tiền Mặt");
            hinhThucThanhToan2.setSoTien(tienMat);
            hinhThucThanhToan2.setMoTa("Thanh Toán Tiền Mặt");
            hinhThucThanhToan2.setTrangThai(0);

            if (tienMat.compareTo(BigDecimal.ZERO) <= 0) {
                hinhThucThanhToanSevice.add(hinhThucThanhToan1);
            } else {
                hinhThucThanhToanSevice.add(hinhThucThanhToan1);
                hinhThucThanhToanSevice.add(hinhThucThanhToan2);
            }

            //Add to history bill
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHd(hoaDon);
            lichSuHoaDon.setIdTk(hoaDonDTO1.getIdTK());
            lichSuHoaDon.setTrangThai(hoaDonDTO1.getTrangThai());
            lichSuHoaDon.setMoTa("Thanh Toán Thành Công");
            lichSuHoaDon.setNgayThayDoi(currentTimestamp);
            lichSuHoaDonService.add(lichSuHoaDon);

            // Switch tab
            response.sendRedirect("http://localhost:3000/dashboard/bills/time-line/" + idHd);

            return ResponseEntity.ok("Thanh Toán Online Thành Công!!!");
        } else {
            response.sendRedirect("http://localhost:3000/dashboard/sales/card-bill/" + idHd);
            return ResponseEntity.ok("Thanh Toán Online Không Thành Công!!!");

        }

    }

    @PutMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (!hoadonSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            Optional<HoaDon> hoaDon = hoadonSevice.detail(id);
            //Add to history bill
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHd(hoaDon.get());
            lichSuHoaDon.setIdTk(hoaDon.get().getIdTK());
            lichSuHoaDon.setTrangThai(hoaDon.get().getTrangThai());
            lichSuHoaDon.setMoTa("Đơn Hàng Đã Bị Xóa");
            lichSuHoaDon.setNgayThayDoi(currentTimestamp);
            lichSuHoaDonService.add(lichSuHoaDon);

            hoadonSevice.delete(id);
            return ResponseEntity.ok("Đã Xóa Thành Công!!!");
        }
    }


}
