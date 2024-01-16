package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.Coupons;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.ChitietsanphamService;
import com.example.fullstackbackend.services.CouponsService;
import com.example.fullstackbackend.services.HoadonSevice;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hoa-don-chi-tiet/")
//@CrossOrigin("http://localhost:3000/")
public class HoaDonChiTietController {
    @Autowired
    private HoadonSevice hoadonSevice;

    @Autowired
    private HoadonchitietSevice hoadonchitietSevice;

    @Autowired
    private ChitietsanphamService chitietsanphamSer;

    @Autowired
    private CouponsService couponsService;


    @GetMapping("view-all")
    public List<HoaDonChiTiet> viewAll() {
        return hoadonchitietSevice.chatlieuPage();
    }

    @GetMapping("view-allProduct/{idKH}")
    public Page<HoaDonChiTiet> getListProductByIDKH(@RequestParam(defaultValue = "0") Integer page,
                                                    @RequestParam(defaultValue = "5") Integer size,
                                                    @RequestParam("p") Optional<Integer> p, @PathVariable("idKH") Integer idKH) {
        return hoadonchitietSevice.getListProductByIDKH(idKH, p.orElse(page), size);
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@Valid @RequestBody HoaDonChiTiet newHD,
                                 BindingResult bindingResult) {
        boolean hasError = false;
        String nameError = "";

        // Check quantity in product
        ChiTietSanPham chiTietSanPham = chitietsanphamSer.findByIdCTSP(newHD.getIdCtsp().getIdCtsp()).orElseThrow();
        if (newHD.getSoLuong() > chiTietSanPham.getSoLuongTon()) {
            nameError = "Số Lượng Tồn Của Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Không Đủ";
            hasError = true;
        } else if (chiTietSanPham.getTrangThai() == 10) {
            nameError = "Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Đã Ngừng Kinh Doanh";
            hasError = true;
        }

        if (bindingResult.hasErrors()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "Nhập Thiếu Trường"));
        } else if (hasError) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", nameError));
        } else {
            return ResponseEntity.ok(hoadonchitietSevice.add(newHD));
        }
    }

    @GetMapping("view-all-prduct/{idHd}")
    public List<Object[]> getSanPhamsWithSizes(@PathVariable("idHd") Integer idHd) {
        return hoadonchitietSevice.getListProductOncart(idHd);
    }

    @GetMapping("view-all-prduct2/{idHd}")
    public List<Object[]> getSanPhamsWithSizes2(@PathVariable("idHd") Integer idHd) {
        return hoadonchitietSevice.getListProductOncart2(idHd);
    }

    @GetMapping("view-all-prduct3/{idHd}")
    public List<Object[]> getSanPhamsWithSizes3(@PathVariable("idHd") Integer idHd) {
        return hoadonchitietSevice.getListProductOncart3(idHd);
    }

    @GetMapping("detail-get-one/{id}")
    public List<HoaDonChiTiet> detailCTSP(@PathVariable("id") Integer id) {
        return hoadonchitietSevice.getOne(id);

    }

    @PutMapping("update-hdct/{id}")
    public ResponseEntity<?> updateHDCT(@Valid @RequestBody HoaDonChiTiet updateHD, @PathVariable("id") Integer id,
                                        BindingResult bindingResult) {
        boolean hasError = false;
        String nameError = "";

        // Check quantity in product
        ChiTietSanPham chiTietSanPham = chitietsanphamSer.findByIdCTSP(updateHD.getIdCtsp().getIdCtsp()).orElseThrow();
        if (updateHD.getSoLuong() > chiTietSanPham.getSoLuongTon()) {
            nameError = "Số Lượng Tồn Của Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Không Đủ";
            hasError = true;
        } else if (chiTietSanPham.getTrangThai() == 10) {
            nameError = "Sản Phẩm " + chiTietSanPham.getIdSp().getTenSp() + " Đã Ngừng Kinh Doanh";
            hasError = true;
        }

        if (bindingResult.hasErrors()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "Nhập Thiếu Trường"));
        } else if (hasError) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", nameError));
        } else {
            return hoadonchitietSevice.update(updateHD);
        }
    }

    @PutMapping("return-item")
    public ResponseEntity<?> returnItem(@Valid @RequestBody HoaDonChiTiet updateHD, @RequestParam Integer status,
                                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "Bạn Đã Nhập Thiếu Trường"));
        } else {
            return ResponseEntity.ok(hoadonchitietSevice.returnItem(updateHD, status));
        }
    }

    @GetMapping("find-by-idHDCT/{id}")
    public ResponseEntity<?> finByIDHDCT(
            @PathVariable("id") Integer id) {
        return ResponseEntity.ok(hoadonchitietSevice.detail(id).orElseThrow());

    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(@RequestBody HoaDonChiTiet newHDCT,
                                    @PathVariable("id") Integer id) {
        return hoadonchitietSevice.detail(id).map(
                hoaDonChiTiet -> {
                    boolean hasError = false;
                    String nameError = "";

                    // Check quantity in product
                    ChiTietSanPham chiTietSanPham1 = chitietsanphamSer.findByIdCTSP(newHDCT.getIdCtsp().getIdCtsp()).orElseThrow();
                    if (newHDCT.getSoLuong() > chiTietSanPham1.getSoLuongTon()) {
                        nameError = "Số Lượng Tồn Của Sản Phẩm " + chiTietSanPham1.getIdSp().getTenSp() + " Không Đủ";
                        hasError = true;
                    } else if (chiTietSanPham1.getTrangThai() == 10) {
                        nameError = "Sản Phẩm " + chiTietSanPham1.getIdSp().getTenSp() + " Đã Ngừng Kinh Doanh";
                        hasError = true;
                    }

                    if (hasError) {
                        return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(Collections.singletonMap("error", nameError));
                    } else {
                        // Detail HD
                        HoaDon hoaDon = hoadonSevice.detail(hoaDonChiTiet.getIdHd().getIdHd()).orElseThrow();
                        if (hoaDon.getTrangThai() < 8) {
                            // Plus old's product
                            ChiTietSanPham chiTietSanPham = chitietsanphamSer.findByIdCTSP(hoaDonChiTiet.getIdCtsp().getIdCtsp()).orElseThrow();
                            int newQuantity = hoaDonChiTiet.getSoLuong() + chiTietSanPham.getSoLuongTon();
                            chiTietSanPham.setSoLuongTon(newQuantity);
                            if (newQuantity > 0) {
                                chiTietSanPham.setTrangThai(0);
                            }
                            chitietsanphamSer.update(chiTietSanPham);
                            // Apart new's product
                            int newQuantity1 = chiTietSanPham.getSoLuongTon() - newHDCT.getSoLuong();
                            chiTietSanPham1.setSoLuongTon(newQuantity1);
                            if (newQuantity1 <= 0) {
                                chiTietSanPham1.setTrangThai(10);
                            }
                            chitietsanphamSer.update(chiTietSanPham1);

                        }
                        ChiTietSanPham ctsp = chitietsanphamSer.findByIdCTSP(newHDCT.getIdCtsp().getIdCtsp()).orElseThrow();
                        BigDecimal newDonGia = ctsp.getGiaThucTe().multiply(new BigDecimal(newHDCT.getSoLuong()));
                        hoaDonChiTiet.setIdCtsp(newHDCT.getIdCtsp());
                        hoaDonChiTiet.setSoLuong(newHDCT.getSoLuong());
                        hoaDonChiTiet.setDonGia(newDonGia);
                        hoadonchitietSevice.update(hoaDonChiTiet);
                        // Update quantity soTienGiam
                        if (hoaDon.getMaGiamGia() != null) {
                            Coupons coupons = couponsService.detailByCode(hoaDon.getMaGiamGia()).orElseThrow();
                            List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietSevice.getHDCTInStatus(hoaDon.getIdHd(), 0);
                            BigDecimal tongTien = BigDecimal.ZERO;

                            for (HoaDonChiTiet x : hoaDonChiTiets) {
                                tongTien = tongTien.add(x.getDonGia());
                            }

                            hoaDon.setTongTien(tongTien);
                            if (hoaDon.getTienShip() == null) {
                                hoaDon.setTienShip(BigDecimal.ZERO);
                            }
                            if (hoaDon.getSoTienGiamGia() == null) {
                                hoaDon.setSoTienGiamGia(BigDecimal.ZERO);
                            } else {
                                Integer phanTram = coupons.getPhanTram();
                                BigDecimal thanhTien = tongTien.add(hoaDon.getTienShip()).subtract(hoaDon.getSoTienGiamGia());
                                BigDecimal soTienGiam = thanhTien.multiply(BigDecimal.valueOf(Double.valueOf(phanTram)).divide(BigDecimal.valueOf(100)));
                                hoaDon.setSoTienGiamGia(soTienGiam);
                            }

                            BigDecimal thanhTien = tongTien.add(hoaDon.getTienShip()).subtract(hoaDon.getSoTienGiamGia());
                            hoaDon.setThanhTien(thanhTien);

                            hoadonSevice.update(hoaDon);
                        }
                        return ResponseEntity.ok("Update Thành Công");
                    }

                }).orElseThrow(() -> new xuatXuNotFoundException(id));

    }

    @PutMapping("update-cart/{id}")
    public HoaDonChiTiet updateCart(@RequestBody HoaDonChiTiet newHDCT,
                                    @PathVariable("id") Integer id) {
        HoaDonChiTiet newHD = hoadonchitietSevice.detail(id).map(
                hoaDonChiTiet -> {
                    hoaDonChiTiet.setIdCtsp(newHDCT.getIdCtsp());
                    hoaDonChiTiet.setSoLuong(newHDCT.getSoLuong());
                    hoaDonChiTiet.setDonGia(newHDCT.getDonGia());
                    return hoadonchitietSevice.updateCart(newHDCT.getIdCtsp(),
                            newHDCT.getSoLuong(),
                            newHDCT.getDonGia(),
                            id);
                }).orElseThrow(() -> new xuatXuNotFoundException(id));
        hoadonchitietSevice.addLS(newHDCT, 3);
        return newHD;
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!hoadonchitietSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            hoadonchitietSevice.delete(id);
            return "";
        }
    }


}
