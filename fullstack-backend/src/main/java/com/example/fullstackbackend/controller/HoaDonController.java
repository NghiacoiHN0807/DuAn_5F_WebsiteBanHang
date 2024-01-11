package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.config.payment.VNPayService;
import com.example.fullstackbackend.config.payment.VNPayServiceClient;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HinhThucThanhToan;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.entity.LichSuHoaDon;
import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.ChitietsanphamService;
import com.example.fullstackbackend.services.HinhThucThanhToanSevice;
import com.example.fullstackbackend.services.HoadonSevice;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import com.example.fullstackbackend.services.LichSuHoaDonService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
import java.util.Collections;
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

//    @Autowired
//    private GioHangChiTietSevice gioHangChiTietSevice;

    Timestamp currentTimestamp;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String formMail;

    public String buildEmailContent(String maHd, String ngayThayDoi, String trangThai) {

        String content = "Bạn đã đặt đơn hàng trên 5F Store";
        content += "\nMã hóa đơn: " + maHd;
        content += "\nNgày thay đổi: " + ngayThayDoi;
        content += "\nTrạng thái: " + trangThai;
        content += "\nTrân trọng.";

        return content;
    }

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
        if (bindingResult.hasErrors()) {
            return ResponseEntity.ok("Đã Lỗi");
        } else {
            // get datetimenow
            java.util.Date currentDate = new java.util.Date();
            // Chuyển đổi thành Timestamp
            currentTimestamp = new Timestamp(currentDate.getTime());

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
    public ResponseEntity<?> updateStatus(@RequestBody HoaDon newHD, @PathVariable("id") Integer id,
                                          @RequestParam String moTa) {
        boolean hasError = false;
        String nameError = "";
        // Check money
        HoaDon hoaDonCheck = hoadonSevice.detail(id).orElseThrow();
        List<HinhThucThanhToan> hinhThucThanhToans = hinhThucThanhToanSevice.detail(id);
        BigDecimal money = BigDecimal.ZERO;
        for (HinhThucThanhToan x :
                hinhThucThanhToans) {
            money = money.add(x.getSoTien());
        }
        if (newHD.getTrangThai() == 5 && hoaDonCheck.getThanhTien().compareTo(money) > 0) {
            nameError = "Số Tiền Thanh Toán Chưa Đủ";
            hasError = true;
        }

        //Done hasError
        if (hasError) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", nameError));
        } else {
            // get datetimenow
            java.util.Date currentDate = new java.util.Date();
            // Chuyển đổi thành Timestamp
            currentTimestamp = new Timestamp(currentDate.getTime());

            HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
                hoaDon.setTrangThai(newHD.getTrangThai());
                if (hoaDon.getEmail() != null && !hoaDon.getEmail().isEmpty()) {
                    if (hoaDon.getTrangThai() == 1) {
                        String trangThai = "Hóa đơn đã được xác nhận";
                        SimpleMailMessage message = new SimpleMailMessage();
                        message.setFrom(formMail);
                        message.setTo(hoaDon.getEmail());
                        message.setSubject("Thông Báo Cập Nhật Hóa Đơn 5F Store");
                        message.setText(buildEmailContent(hoaDon.getMaHd(), String.valueOf(currentTimestamp), trangThai));
                        mailSender.send(message);
                    }
                    if (hoaDon.getTrangThai() == 3) {
                        String trangThai = "Đơn hàng đã chuyển cho đơn vị vận chuyển";
                        SimpleMailMessage message = new SimpleMailMessage();
                        message.setFrom(formMail);
                        message.setTo(hoaDon.getEmail());
                        message.setSubject("Thông Báo Cập Nhật Hóa Đơn 5F Store");
                        message.setText(buildEmailContent(hoaDon.getMaHd(), String.valueOf(currentTimestamp), trangThai));
                        mailSender.send(message);
                    }
                    if (hoaDon.getTrangThai() == 4) {
                        String trangThai = "Đơn hàng đã được xác nhận thanh toán";
                        SimpleMailMessage message = new SimpleMailMessage();
                        message.setFrom(formMail);
                        message.setTo(hoaDon.getEmail());
                        message.setSubject("Thông Báo Cập Nhật Hóa Đơn 5F Store");
                        message.setText(buildEmailContent(hoaDon.getMaHd(), String.valueOf(currentTimestamp), trangThai));
                        mailSender.send(message);
                    }
                    if (hoaDon.getTrangThai() == 5) {
                        String trangThai = "Đơn hàng đã được nhận thành công";
                        SimpleMailMessage message = new SimpleMailMessage();
                        message.setFrom(formMail);
                        message.setTo(hoaDon.getEmail());
                        message.setSubject("Thông Báo Cập Nhật Hóa Đơn 5F Store");
                        message.setText(buildEmailContent(hoaDon.getMaHd(), String.valueOf(currentTimestamp), trangThai));
                        mailSender.send(message);
                    }
                    if (hoaDon.getTrangThai() == 6) {
                        String trangThai = "Đơn hàng đã được xác nhận đổi trả";
                        SimpleMailMessage message = new SimpleMailMessage();
                        message.setFrom(formMail);
                        message.setTo(hoaDon.getEmail());
                        message.setSubject("Thông Báo Cập Nhật Hóa Đơn 5F Store");
                        message.setText(buildEmailContent(hoaDon.getMaHd(), String.valueOf(currentTimestamp), trangThai));
                        mailSender.send(message);
                    }
                    if (hoaDon.getTrangThai() == 10) {
                        String trangThai = "Đơn hàng đã bị hủy";
                        SimpleMailMessage message = new SimpleMailMessage();
                        message.setFrom(formMail);
                        message.setTo(hoaDon.getEmail());
                        message.setSubject("Thông Báo Cập Nhật Hóa Đơn 5F Store");
                        message.setText(buildEmailContent(hoaDon.getMaHd(), String.valueOf(currentTimestamp), trangThai));
                        mailSender.send(message);
                    }
                }

                return hoadonSevice.update(hoaDon);
            }).orElseThrow(() -> new xuatXuNotFoundException(id));

            List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietSer.findAllByIDHD(newHD1.getIdHd());

            if (newHD.getTrangThai() == 10 || newHD.getTrangThai() == 15) {
                for (HoaDonChiTiet x :
                        hoaDonChiTiets) {
                    List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(x.getIdCtsp().getIdCtsp());
                    for (ChiTietSanPham y :
                            chiTietSanPhams) {
                        y.setSoLuongTon(y.getSoLuongTon() + x.getSoLuong());
                        if (y.getSoLuongTon() <= 0) {
                            y.setTrangThai(10);
                        }
                        chitietsanphamSer.update(y);
                    }
                }
            } else if (newHD1.getTrangThai() == 6) {
                for (HoaDonChiTiet x :
                        hoaDonChiTiets) {
                    List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(x.getIdCtsp().getIdCtsp());
                    for (ChiTietSanPham y :
                            chiTietSanPhams) {
                        y.setSoLuongTon(y.getSoLuongTon() + x.getSoLuong());
                        if (y.getSoLuongTon() <= 0) {
                            y.setTrangThai(10);
                        } else {
                            y.setTrangThai(0);
                        }
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

            return ResponseEntity.ok("Cập Nhập Trạng Thái Thành Công");
        }

    }

    @PutMapping("update-payment/{id}")
    public ResponseEntity<?> updateThanhToan(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {

        boolean hasError = false;
        String nameError = "";

        // Check quantity in product
        List<HoaDonChiTiet> hoaDonChiTiet = hoadonchitietSer.findAllByIDHD(id);
        for (HoaDonChiTiet x :
                hoaDonChiTiet) {
            ChiTietSanPham chiTietSanPham = chitietsanphamSer.findByIdCTSP(x.getIdCtsp().getIdCtsp()).orElseThrow();
            if (x.getSoLuong() > chiTietSanPham.getSoLuongTon()) {
                nameError = "Số Lượng Tồn Của Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Không Đủ";
                hasError = true;
                break;
            } else if (chiTietSanPham.getTrangThai() == 10) {
                nameError = "Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Đã Ngừng Kinh Doanh";
                hasError = true;
                break;
            }
        }

        //Done hasError
        if (hasError) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", nameError));
        } else {
            // get datetimenow
            java.util.Date currentDate = new java.util.Date();
            // Chuyển đổi thành Timestamp
            currentTimestamp = new Timestamp(currentDate.getTime());

            HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
                BigDecimal thanhTien = hoaDon.getTongTien().add(hoaDon.getTienShip());

                hoaDon.setTenKh(newHD.getTenKh());
                hoaDon.setSdtKh(newHD.getSdtKh());
                hoaDon.setNgayThanhToan(currentTimestamp);
                hoaDon.setThanhTien(thanhTien);
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
                        if (y.getSoLuongTon() <= 0) {
                            y.setTrangThai(10);
                        }
                        chitietsanphamSer.update(y);
                    }
                }
            }

            //Add to payments
            HinhThucThanhToan hinhThucThanhToan2 = new HinhThucThanhToan();
            hinhThucThanhToan2.setIdHd(newHD1);
            hinhThucThanhToan2.setNgayThanhToan(currentTimestamp);
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

            return ResponseEntity.ok("Thanh Toán Thành Công");
        }
    }

    @PutMapping("update-payment1/{id}")
    public ResponseEntity<?> updateThanhToan1(@PathVariable("id") Integer id, @RequestParam("soTienTra") BigDecimal soTienTra) {
        // get datetimenow
        java.util.Date currentDate = new java.util.Date();
        // Chuyển đổi thành Timestamp
        currentTimestamp = new Timestamp(currentDate.getTime());

        HoaDon newHD1 = hoadonSevice.detail(id).orElseThrow();
        //Add to payments
        HinhThucThanhToan hinhThucThanhToan2 = new HinhThucThanhToan();
        hinhThucThanhToan2.setIdHd(newHD1);
        hinhThucThanhToan2.setHinhThuc("Thanh Toán Tiền Mặt");
        hinhThucThanhToan2.setSoTien(soTienTra);
        hinhThucThanhToan2.setNgayThanhToan(currentTimestamp);
        hinhThucThanhToan2.setMoTa("Thanh Toán Tiền Mặt");
        hinhThucThanhToan2.setTrangThai(0);
        hinhThucThanhToanSevice.add(hinhThucThanhToan2);

        //Add to history bill
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHd(newHD1);
        lichSuHoaDon.setIdTk(newHD1.getIdTK());
        lichSuHoaDon.setTrangThai(4);
        lichSuHoaDon.setMoTa("Thanh Toán Thành Công");
        lichSuHoaDon.setNgayThayDoi(currentTimestamp);
        lichSuHoaDonService.add(lichSuHoaDon);

        return ResponseEntity.ok("Thanh Toán Thành Công");

    }

    @PutMapping("update-client-payment/{id}")
    public ResponseEntity<?> updateClientThanhToan(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {

        boolean hasError = false;
        String nameError = "";

//        Check quantity in product
        List<HoaDonChiTiet> hoaDonChiTiet = hoadonchitietSer.findAllByIDHD(id);
        for (HoaDonChiTiet x :
                hoaDonChiTiet) {
            ChiTietSanPham chiTietSanPham = chitietsanphamSer.findByIdCTSP(x.getIdCtsp().getIdCtsp()).orElseThrow();
            if (x.getSoLuong() > chiTietSanPham.getSoLuongTon()) {
                nameError = "Số Lượng Tồn Của Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Không Đủ";
                hasError = true;
                break;
            } else if (chiTietSanPham.getTrangThai() == 10) {
                nameError = "Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Đã Ngừng Kinh Doanh";
                hasError = true;
                break;
            }
        }

        //Done hasError
        if (hasError) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", nameError));
        } else {
            // get datetimenow
            java.util.Date currentDate = new java.util.Date();
            // Chuyển đổi thành Timestamp
            currentTimestamp = new Timestamp(currentDate.getTime());

            HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
                hoaDon.setTenKh(newHD.getTenKh());
                hoaDon.setSdtKh(newHD.getSdtKh());
                hoaDon.setEmail(newHD.getEmail());
                hoaDon.setDiaChi(newHD.getDiaChi());
                hoaDon.setNgayTao(currentTimestamp);
                hoaDon.setTrangThai(0);
                return hoadonSevice.update(hoaDon);
            }).orElseThrow(() -> new xuatXuNotFoundException(id));

            // Update quantity in product
            for (HoaDonChiTiet x :
                    hoaDonChiTiet) {
                List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(x.getIdCtsp().getIdCtsp());
                for (ChiTietSanPham y :
                        chiTietSanPhams) {
                    y.setSoLuongTon(y.getSoLuongTon() - x.getSoLuong());
                    if (y.getSoLuongTon() <= 0) {
                        y.setTrangThai(10);
                    }
                    chitietsanphamSer.update(y);
                }
            }

            //Add to history bill
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHd(newHD1);
            lichSuHoaDon.setIdTk(newHD1.getIdTK());
            lichSuHoaDon.setTrangThai(newHD1.getTrangThai());
            lichSuHoaDon.setMoTa("Tạo Đơn Hàng Ship Thành Công");
            lichSuHoaDon.setNgayThayDoi(currentTimestamp);
            lichSuHoaDonService.add(lichSuHoaDon);

            return ResponseEntity.ok("Thanh Toán Thành Công");
        }

    }

    @PutMapping("update-client-payment1/{id}")
    public ResponseEntity<?> updateClientThanhToan1(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        boolean hasError = false;
        String nameError = "";

        // Check quantity in product
        List<HoaDonChiTiet> hoaDonChiTiet = hoadonchitietSer.findAllByIDHD(id);
        for (HoaDonChiTiet x :
                hoaDonChiTiet) {
            ChiTietSanPham chiTietSanPham = chitietsanphamSer.findByIdCTSP(x.getIdCtsp().getIdCtsp()).orElseThrow();
            if (x.getSoLuong() > chiTietSanPham.getSoLuongTon()) {
                nameError = "Số Lượng Tồn Của Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Không Đủ";
                hasError = true;
                break;
            } else if (chiTietSanPham.getTrangThai() == 10) {
                nameError = "Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Đã Ngừng Kinh Doanh";
                hasError = true;
                break;
            }
        }

        //Done hasError
        if (hasError) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", nameError));
        } else {
            // get datetimenow
            java.util.Date currentDate = new java.util.Date();
            // Chuyển đổi thành Timestamp
            currentTimestamp = new Timestamp(currentDate.getTime());

            HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
                hoaDon.setTenKh(newHD.getTenKh());
                hoaDon.setSdtKh(newHD.getSdtKh());
                hoaDon.setEmail(newHD.getEmail());
                hoaDon.setDiaChi(newHD.getDiaChi());
                hoaDon.setNgayTao(currentTimestamp);
                return hoadonSevice.update(hoaDon);
            }).orElseThrow(() -> new xuatXuNotFoundException(id));

            // Update quantity in product
            for (HoaDonChiTiet x :
                    hoaDonChiTiet) {
                List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(x.getIdCtsp().getIdCtsp());
                for (ChiTietSanPham y :
                        chiTietSanPhams) {
                    y.setSoLuongTon(y.getSoLuongTon() - x.getSoLuong());
                    if (y.getSoLuongTon() <= 0) {
                        y.setTrangThai(10);
                    }
                    chitietsanphamSer.update(y);
                }
            }
            return ResponseEntity.ok(newHD1);
        }
    }


    @PutMapping("update-ship-online/{id}")
    public ResponseEntity<?> updateShipOnline(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {

        boolean hasError = false;
        String nameError = "";

        // Check quantity in product
        List<HoaDonChiTiet> hoaDonChiTiet = hoadonchitietSer.findAllByIDHD(id);
        for (HoaDonChiTiet x :
                hoaDonChiTiet) {
            ChiTietSanPham chiTietSanPham = chitietsanphamSer.findByIdCTSP(x.getIdCtsp().getIdCtsp()).orElseThrow();
            if (x.getSoLuong() > chiTietSanPham.getSoLuongTon()) {
                nameError = "Số Lượng Tồn Của Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Không Đủ";
                hasError = true;
                break;
            } else if (chiTietSanPham.getTrangThai() == 10) {
                nameError = "Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Đã Ngừng Kinh Doanh";
                hasError = true;
                break;
            }
        }

        //Done hasError
        if (hasError) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", nameError));
        } else {// get datetimenow
            java.util.Date currentDate = new java.util.Date();
            // Chuyển đổi thành Timestamp
            currentTimestamp = new Timestamp(currentDate.getTime());

            HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
                hoaDon.setTenKh(newHD.getTenKh());
                hoaDon.setSdtKh(newHD.getSdtKh());
                hoaDon.setEmail(newHD.getEmail());
                hoaDon.setNgayThanhToan(currentTimestamp);
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
            return ResponseEntity.ok("Tạo Đơn Ship Thành Công ");

        }

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
            if (hoaDon.getTongTien() == null) {
                hoaDon.setTongTien(BigDecimal.ZERO);
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

    @PutMapping("update-khach-hang1/{id}")
    public HoaDon updateKhachHang1(@PathVariable("id") Integer id) {
        return hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setIdKH(null);
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));
    }

    @PutMapping("update-khach-hang2/{id}")
    public HoaDon updateKhachHang2(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
        // get datetimenow
        java.util.Date currentDate = new java.util.Date();
        // Chuyển đổi thành Timestamp
        currentTimestamp = new Timestamp(currentDate.getTime());

        HoaDon newHD1 = hoadonSevice.detail(id).map(hoaDon -> {
            hoaDon.setTenKh(newHD.getTenKh());
            hoaDon.setSdtKh(newHD.getSdtKh());
            hoaDon.setEmail(newHD.getEmail());
            hoaDon.setDiaChi(newHD.getDiaChi());
            BigDecimal thanhTien = hoaDon.getThanhTien().subtract(hoaDon.getTienShip()).add(newHD.getTienShip());
            hoaDon.setTienShip(newHD.getTienShip());
            hoaDon.setThanhTien(thanhTien);
            return hoadonSevice.update(hoaDon);
        }).orElseThrow(() -> new xuatXuNotFoundException(id));

        //Add to history bill
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
        lichSuHoaDon.setIdHd(newHD1);
        lichSuHoaDon.setIdTk(newHD1.getIdTK());
        lichSuHoaDon.setTrangThai(12);
        lichSuHoaDon.setMoTa("Thay Đổi Thông Tin Khách Hàng: " + newHD.getDiaChi());
        lichSuHoaDon.setNgayThayDoi(currentTimestamp);
        lichSuHoaDonService.add(lichSuHoaDon);

        return newHD1;
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
        //Detail HD by IdHd
        Optional<HoaDon> getOne = hoadonSevice.detail(idHd);
        // get datetimenow
        java.util.Date currentDate = new java.util.Date();
        // Chuyển đổi thành Timestamp
        currentTimestamp = new Timestamp(currentDate.getTime());

        if (paymentStatus == 1) {

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
            hinhThucThanhToan1.setNgayThanhToan(currentTimestamp);

            hinhThucThanhToan1.setHinhThuc("Thanh Toán VNPAY");
            hinhThucThanhToan1.setSoTien(realPrice);
            hinhThucThanhToan1.setMoTa("Thanh Toán VNPAY");
            hinhThucThanhToan1.setTrangThai(0);

            HinhThucThanhToan hinhThucThanhToan2 = new HinhThucThanhToan();
            hinhThucThanhToan2.setNgayThanhToan(currentTimestamp);

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

            return ResponseEntity.ok("Thanh Toán VNPAY Thành Công!!!");
        } else {
            if (getOne.get().getTrangThai() <= 6) {
                response.sendRedirect("http://localhost:3000/dashboard/bills/time-line/" + idHd);
                return ResponseEntity.ok("Thanh Toán VNPAY Không Thành Công!!!");
            } else {
                response.sendRedirect("http://localhost:3000/dashboard/sales/card-bill/" + idHd);
                return ResponseEntity.ok("Thanh Toán VNPAY Không Thành Công!!!");
            }
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

        // get datetimenow
        java.util.Date currentDate = new java.util.Date();
        // Chuyển đổi thành Timestamp
        currentTimestamp = new Timestamp(currentDate.getTime());

        if (paymentStatus == 1) {
            //Detail HD by IdHd
            HoaDon getOne = hoadonSevice.detail(idHd).orElseThrow();

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
            hinhThucThanhToan1.setNgayThanhToan(currentTimestamp);
            hinhThucThanhToan1.setHinhThuc("Thanh Toán VNPAY");
            hinhThucThanhToan1.setSoTien(realPrice);
            hinhThucThanhToan1.setMoTa("Thanh Toán Bằng Thẻ Qua VNPay");
            hinhThucThanhToan1.setTrangThai(0);
            hinhThucThanhToanSevice.add(hinhThucThanhToan1);

            //Add to history bill
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHd(hoaDon);
            lichSuHoaDon.setIdTk(hoaDonDTO1.getIdTK());
            lichSuHoaDon.setTrangThai(hoaDonDTO1.getTrangThai());
            lichSuHoaDon.setMoTa("Thanh Toán Thành Công");
            lichSuHoaDon.setNgayThayDoi(currentTimestamp);
            lichSuHoaDonService.add(lichSuHoaDon);

            // Update quantity in product
            List<HoaDonChiTiet> hoaDonChiTiet = hoadonchitietSer.findAllByIDHD(idHd);
            for (HoaDonChiTiet x :
                    hoaDonChiTiet) {
                List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(x.getIdCtsp().getIdCtsp());
                for (ChiTietSanPham y :
                        chiTietSanPhams) {
                    y.setSoLuongTon(y.getSoLuongTon() - x.getSoLuong());
                    if (y.getSoLuongTon() <= 0) {
                        y.setTrangThai(10);
                    }
                    chitietsanphamSer.update(y);
                }
            }
            // Delete product on detail cart
//            List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietSer.findAllByIDHD(idHd);
//            for (HoaDonChiTiet x :
//                    hoaDonChiTiets) {
//                GioHangChiTiet gioHangChiTiet = gioHangChiTietSevice.finByIDCTSP(x.getIdCtsp().getIdCtsp()).orElseThrow();
//                gioHangChiTietSevice.deleteGHCT(gioHangChiTiet.getIdGhct());
//            }

            // Update HD to ship
            getOne.setTrangThai(0);
            updateStatus(getOne, getOne.getIdHd(), "Thanh Toán VNPAY");
            if (getOne.getIdKH() != null) {
                response.sendRedirect("http://localhost:3000/client/client-timeline/" + idHd);
            } else {
                response.sendRedirect("http://localhost:3000");
            }

            return ResponseEntity.ok("Thanh Toán VNPAY Thành Công!!!");
        } else {
            response.sendRedirect("http://localhost:3000/client/payment/" + idHd);
            return ResponseEntity.ok("Thanh Toán VNPAY Không Thành Công!!!");

        }

    }

    @PutMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (!hoadonSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            // get datetimenow
            java.util.Date currentDate = new java.util.Date();
            // Chuyển đổi thành Timestamp
            currentTimestamp = new Timestamp(currentDate.getTime());

            HoaDon hoaDon = hoadonSevice.detail(id).orElseThrow();
            //Add to history bill
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setIdHd(hoaDon);
            lichSuHoaDon.setIdTk(hoaDon.getIdTK());
            lichSuHoaDon.setTrangThai(10);
            lichSuHoaDon.setMoTa("Đơn Hàng Đã Bị Xóa");
            lichSuHoaDon.setNgayThayDoi(currentTimestamp);
            lichSuHoaDonService.add(lichSuHoaDon);

            // Update Qantity Product
            List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietSer.findAllByIDHD(id);

            for (HoaDonChiTiet x :
                    hoaDonChiTiets) {
                List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(x.getIdCtsp().getIdCtsp());
                for (ChiTietSanPham y :
                        chiTietSanPhams) {
                    y.setSoLuongTon(y.getSoLuongTon() + x.getSoLuong());
                    if (y.getSoLuongTon() <= 0) {
                        y.setTrangThai(10);
                    } else {
                        y.setTrangThai(0);
                    }
                    chitietsanphamSer.update(y);
                }
            }
            //Delete
            hoadonSevice.delete(id);
            return ResponseEntity.ok("Đã Xóa Thành Công!!!");
        }
    }

    @GetMapping("/view-bill-idkh/{idKH}")
    public ResponseEntity<?> viewAllHDByIDKH(@PathVariable("idKH") Integer idKH) {
        return ResponseEntity.ok(hoadonSevice.findAllByIDKH(idKH));
    }

    @DeleteMapping("/delete-over-time/{idHd}")
    public ResponseEntity<?> deleteOverTime(@PathVariable("idHd") Integer idHd) {
        hoadonSevice.deleteHDOver(idHd);
        return ResponseEntity.ok("Xóa Hóa Đơn Quá Thời Gian Thanh Toán");
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