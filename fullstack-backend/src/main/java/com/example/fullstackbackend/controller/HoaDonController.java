package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.config.payment.VNPayService;
import com.example.fullstackbackend.config.payment.VNPayServiceClient;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GioHangChiTiet;
import com.example.fullstackbackend.entity.HinhThucThanhToan;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.ChitietsanphamService;
import com.example.fullstackbackend.services.GioHangChiTietSevice;
import com.example.fullstackbackend.services.HinhThucThanhToanSevice;
import com.example.fullstackbackend.services.HoadonSevice;
import com.example.fullstackbackend.services.HoadonchitietSevice;
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
    private VNPayServiceClient vnPayServiceClient;

    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;

    @Autowired
    private HinhThucThanhToanSevice hinhThucThanhToanSevice;

    @Autowired
    private HoadonchitietSevice hoadonchitietSer;

    @Autowired
    private ChitietsanphamService chitietsanphamSer;

    @Autowired
    private GioHangChiTietSevice gioHangChiTietSevice;
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
    public ResponseEntity<?> add(@Valid @RequestBody HoaDon newHD, BindingResult bindingResult) {
        System.out.println("add123: " + newHD.getTrangThai());
        if (bindingResult.hasErrors()) {
            return ResponseEntity.ok("Đã Lỗi");
        } else {
            System.out.println("add123: " + newHD.getTrangThai());
            HoaDon hoaDon = hoadonSevice.add(newHD);
            // Add to history bill
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHd(hoaDon);
            lichSuHoaDon.setIdTk(hoaDon.getIdTK());
            lichSuHoaDon.setTrangThai(hoaDon.getTrangThai());
            lichSuHoaDon.setMoTa("Tạo Đơn Chờ Tại Quầy Thành Công");
            lichSuHoaDon.setNgayThayDoi(currentTimestamp);
            lichSuHoaDonService.add(lichSuHoaDon);
            return ResponseEntity.ok(hoaDon);
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

        List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietSer.findAllByIDHD(newHD1.getIdHd());

        if (newHD.getTrangThai() == 1) {
            for (HoaDonChiTiet x :
                    hoaDonChiTiets) {
                System.out.println("x.getIdCtsp().getIdCtsp():" + x.getIdCtsp().getIdCtsp());
                List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(x.getIdCtsp().getIdCtsp());
                for (ChiTietSanPham y :
                        chiTietSanPhams) {
                    System.out.println("Số Lượng Còn Lại:" + (y.getSoLuongTon() - x.getSoLuong()));
                    System.out.println("Số Lượng Còn Lại:" + y.getSoLuongTon());
                    y.setSoLuongTon(y.getSoLuongTon() - x.getSoLuong());
                    System.out.println("y.getIdCtsp(): " + y.getIdCtsp());
                    chitietsanphamSer.update(y);
                }
            }
        } else if (newHD1.getTrangThai() == 6) {
            for (HoaDonChiTiet x :
                    hoaDonChiTiets) {
                List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(x.getIdCtsp().getIdCtsp());
                for (ChiTietSanPham y :
                        chiTietSanPhams) {
                    System.out.println("Số Lượng Còn Lại:" + y.getSoLuongTon());
                    y.setSoLuongTon(y.getSoLuongTon() + x.getSoLuong());
                    chitietsanphamSer.update(y);
                }
            }
        }

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
            hoaDon.setKieuHoaDon(hoaDon.getKieuHoaDon());
            hoaDon.setTrangThai(newHD.getTrangThai());
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));

        List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietSer.findAllByIDHD(newHD1.getIdHd());
        //Update Inventory number

        if (newHD.getTrangThai() == 9) {
            for (HoaDonChiTiet x :
                    hoaDonChiTiets) {
                List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(x.getIdCtsp().getIdCtsp());
                for (ChiTietSanPham y :
                        chiTietSanPhams) {
                    y.setSoLuongTon(y.getSoLuongTon() - x.getSoLuong());
                    chitietsanphamSer.update(y);
                }
            }
        }

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

    @PutMapping("update-client-payment/{id}")
    public HoaDon updateClientThanhToan(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setTenKh(newHD.getTenKh());
            hoaDon.setSdtKh(newHD.getSdtKh());
            hoaDon.setDiaChi(newHD.getDiaChi());
            hoaDon.setNgayTao(currentTimestamp);
            hoaDon.setTrangThai(0);
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

    @PutMapping("update-client-payment1/{id}")
    public HoaDon updateClientThanhToan1(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setTenKh(newHD.getTenKh());
            hoaDon.setSdtKh(newHD.getSdtKh());
            hoaDon.setDiaChi(newHD.getDiaChi());
            hoaDon.setNgayTao(currentTimestamp);
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));

        //Add to history bill
//        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
//        lichSuHoaDon.setIdHd(newHD1);
//        lichSuHoaDon.setIdTk(newHD1.getIdTK());
//        lichSuHoaDon.setTrangThai(newHD1.getTrangThai());
//        lichSuHoaDon.setMoTa("Tạo Đơn Hàng Ship Thành Công");
//        lichSuHoaDon.setNgayThayDoi(currentTimestamp);
//        lichSuHoaDonService.add(lichSuHoaDon);

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
            BigDecimal thanhTien = newHD.getTongTien().add(newHD.getTienShip());
            hoaDon.setTongTien(newHD.getTongTien());
            hoaDon.setTienShip(newHD.getTienShip());
            hoaDon.setThanhTien(thanhTien);
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));
    }

    @PutMapping("update-tien-ship/{id}")
    public HoaDon updateTienShip(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        return hoadonSevice.detail(id).map(hoaDon -> {
            if (hoaDon.getSoTienGiamGia() == null) {
                hoaDon.setSoTienGiamGia(BigDecimal.ZERO);
            }
            BigDecimal thanhTien = (hoaDon.getTongTien().add(newHD.getTienShip())).subtract(hoaDon.getSoTienGiamGia());
            hoaDon.setTienShip(newHD.getTienShip());
            hoaDon.setThanhTien(thanhTien);
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

    // Admin
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
            hoaDonDTO1.setNgayThanhToan(currentTimestamp);
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

    // Client
    @PostMapping("submitOrder-client")
    public String submidOrderClient(@RequestParam("amount") BigDecimal orderTotal,
                                    @RequestParam("orderInfo") String orderInfo,
                                    HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        return vnPayServiceClient.createOrder(orderTotal, orderInfo, baseUrl);
    }

    @GetMapping("vnpay-payment-client")
    public ResponseEntity<String> GetMappingClient(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int paymentStatus = vnPayServiceClient.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String totalPrice = request.getParameter("vnp_Amount");
        BigDecimal realPrice = new BigDecimal(totalPrice).divide(new BigDecimal(100));
        Integer idHd = Integer.valueOf(orderInfo);

        if (paymentStatus == 1) {
            //Detail HD by IdHd
            HoaDon getOne = hoadonSevice.detail(idHd).orElseThrow();
            BigDecimal getTongTien = getOne.getTongTien();

            BigDecimal tienMat = getTongTien.subtract(realPrice);
            //Add to updatePaymentOnline
            HoaDon hoaDonDTO1 = new HoaDon();
            hoaDonDTO1.setNgayThanhToan(currentTimestamp);
            hoaDonDTO1.setTienDua(realPrice);
            int setTrangThai;
            if (getOne.getTrangThai() == 3) {
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

            // Delete product on detail cart
            List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietSer.findAllByIDHD(idHd);
            for (HoaDonChiTiet x :
                    hoaDonChiTiets) {
                GioHangChiTiet gioHangChiTiet = gioHangChiTietSevice.finByIDCTSP(x.getIdCtsp().getIdCtsp()).orElseThrow();
                gioHangChiTietSevice.deleteGHCT(gioHangChiTiet.getIdGhct());
            }

            // Update HD to ship
            getOne.setTrangThai(0);
            updateStatus(getOne, getOne.getIdHd(), "Thanh Toán Online");

            // Switch tab
//            response.sendRedirect("http://localhost:3000/client/client-timeline/" + idHd);
            response.sendRedirect("http://localhost:3000");

            return ResponseEntity.ok("Thanh Toán Online Thành Công!!!");
        } else {
            response.sendRedirect("http://localhost:3000/client/payment/" + idHd);
            return ResponseEntity.ok("Thanh Toán Online Không Thành Công!!!");

        }

    }

    @PutMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (!hoadonSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            HoaDon hoaDon = hoadonSevice.detail(id).orElseThrow();
            //Add to history bill
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHd(hoaDon);
            lichSuHoaDon.setIdTk(hoaDon.getIdTK());
            lichSuHoaDon.setTrangThai(10);
            lichSuHoaDon.setMoTa("Đơn Hàng Đã Bị Xóa");
            lichSuHoaDon.setNgayThayDoi(currentTimestamp);
            lichSuHoaDonService.add(lichSuHoaDon);

            hoadonSevice.delete(id);
            return ResponseEntity.ok("Đã Xóa Thành Công!!!");
        }
    }

    @GetMapping("/view-bill-idkh/{idKH}")
    public ResponseEntity<?> viewAllHDByIDKH(@PathVariable("idKH") Integer idKH) {
        return ResponseEntity.ok(hoadonSevice.findAllByIDKH(idKH));
    }

    @GetMapping("/total-revenue")
    public Double getTotalTongTien() {
        return hoadonSevice.calculateTotalTongTien();
    }

    @GetMapping("/total-invoices")
    public long getTotalInvoices() {
        return hoadonSevice.totalInvoice();
    }

    @GetMapping("/total-revenue-by-day")
    public List<Object[]> getTotalRevenueByDay() {
        return hoadonSevice.getTotalRevenueByDay();
    }

    @GetMapping("/ty-le-tra-hang")
    public Double getTyLeTraHang() {
        return hoadonSevice.getTyLeTraHang();
    }

    @GetMapping("/tong-sp-da-ban")
    public Long getSpDaBan() {
        return hoadonSevice.tongSpDaban();
    }
}
