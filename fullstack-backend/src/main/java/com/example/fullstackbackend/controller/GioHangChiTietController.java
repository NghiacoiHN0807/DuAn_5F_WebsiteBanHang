package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GioHang;
import com.example.fullstackbackend.entity.GioHangChiTiet;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.repository.GioHangReponsitory;
import com.example.fullstackbackend.repository.HoadonRepository;
import com.example.fullstackbackend.services.ChitietsanphamService;
import com.example.fullstackbackend.services.GioHangChiTietSevice;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/gio-hang-chi-tiet/")
@CrossOrigin("http://localhost:3000/")
public class GioHangChiTietController {
    @Autowired
    private GioHangChiTietSevice gioHangChiTietSevice;

    @Autowired
    private HoadonchitietSevice hoadonchitietSevice;

    @Autowired
    private HoadonRepository hoadonSevice;

    @Autowired
    private ChitietsanphamService chitietsanphamSer;

    @Autowired
    private GioHangReponsitory gioHangReponsitory;

    @GetMapping("view-all/{id}")
    public List<GioHangChiTiet> viewAll(@PathVariable("id") Integer id) {
        return gioHangChiTietSevice.getAll(id);
    }

    @PostMapping("add/{idKH}")
    public ResponseEntity<?> addGHCT(@PathVariable("idKH") Integer id, @Valid @RequestBody GioHangChiTiet addGHCT, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.ok("Không Được Để Trống");
        } else {
            gioHangChiTietSevice.addGHCT(id, addGHCT);
            return ResponseEntity.ok("Thêm Thành Công");
        }
    }

    @PutMapping("update/{id}/{idGH}")
    public ResponseEntity<?> updateGHCT(@PathVariable("id") Integer id,
                                        @PathVariable("idGH") Integer idGH,
                                        @Valid @RequestBody GioHangChiTiet updateGHCT,
                                        BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.ok("Không Được Để Trống");
        } else {
            gioHangChiTietSevice.updateGHCT(id, idGH, updateGHCT);
            return ResponseEntity.ok("Update Thành Công");
        }
    }

    @PutMapping("update-product/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Integer id, @Valid @RequestBody GioHangChiTiet updateGHCT, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.ok("Không Được Để Trống");
        } else {
            return ResponseEntity.ok(gioHangChiTietSevice.detail(id).map(
                    gioHangChiTiet -> {
                        gioHangChiTiet.setIdCtsp(updateGHCT.getIdCtsp());
                        gioHangChiTiet.setSoLuong(updateGHCT.getSoLuong());
                        return gioHangChiTietSevice.update(gioHangChiTiet);
                    }).orElseThrow(() -> new xuatXuNotFoundException(id)));
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteGHCT(@PathVariable("id") Integer id) {
        if (id == null) {
            return ResponseEntity.ok("Xóa Sản Phẩm Thất Bại!!!");
        } else {
            gioHangChiTietSevice.deleteGHCT(id);
            return ResponseEntity.ok("Xóa Sản Phẩm Thành Công!!!");
        }
    }

    @PostMapping("add-to-hdct/{id}")
    public ResponseEntity<?> addToHDCT(@PathVariable("id") Integer idHD,
                                       @RequestBody GioHangChiTiet newHDCT) {
        System.out.println("newHDCT.getIdCtsp().getSoLuongTon(): " + newHDCT.getIdCtsp().getSoLuongTon());
        System.out.println("newHDCT.getSoLuong(): " + newHDCT.getSoLuong());
        if (newHDCT.getIdCtsp().getSoLuongTon() < newHDCT.getSoLuong()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "Số Lượng Tồn Của Sản Phẩm Không Đủ"));
        } else {
            // Detail HoaDon
            HoaDon hoaDon = hoadonSevice.findById(idHD).orElseThrow();

            // Set HDCT
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setIdHd(hoaDon);
            hoaDonChiTiet.setIdCtsp(newHDCT.getIdCtsp());
            hoaDonChiTiet.setSoLuong(newHDCT.getSoLuong());
            hoaDonChiTiet.setDonGia(newHDCT.getDonGia());
            hoaDonChiTiet.setTrangThai(0);
            hoadonchitietSevice.add1(hoaDonChiTiet);

            // Update quantity in product
////            List<ChiTietSanPham> chiTietSanPhams = chitietsanphamSer.finAllByIDCTSP(newHDCT.getIdCtsp().getIdCtsp());
////            for (ChiTietSanPham y :
////                    chiTietSanPhams) {
////                y.setSoLuongTon(y.getSoLuongTon() - newHDCT.getSoLuong());
////                if (y.getSoLuongTon() <= 0) {
////                    y.setTrangThai(10);
////                }
////                chitietsanphamSer.update(y);
////            }

            return ResponseEntity.ok("Tạo Hóa Đơn Thành Công!!!");
        }

    }

    @DeleteMapping("delete-product/{id}")
    public ResponseEntity<?> deteleproductOnCart(@PathVariable("id") Integer idHD) {

        List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietSevice.findAllByIDHD(idHD);

        for (HoaDonChiTiet x :
                hoaDonChiTiets) {
            // Detail idGH
            HoaDon hoaDon = hoadonSevice.findById(idHD).orElseThrow();
            if (hoaDon.getIdKH() != null) {
                GioHang gioHang = gioHangReponsitory.findByIdKh_IdTaiKhoan(hoaDon.getIdKH().getIdTaiKhoan()).orElseThrow();
                GioHangChiTiet gioHangChiTiet = gioHangChiTietSevice.finByIDCTSP(x.getIdCtsp().getIdCtsp(), gioHang.getIdGioHang()).orElseThrow();
                gioHangChiTietSevice.deleteGHCT(gioHangChiTiet.getIdGhct());
            }

        }
        // Delete product on cart

        return ResponseEntity.ok("Đã Xóa Sản Phẩm Rea Khỏi Giỏ Hàng!!!");
    }

}
