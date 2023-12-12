package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.GioHangChiTiet;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.repository.HoadonRepository;
import com.example.fullstackbackend.services.GioHangChiTietSevice;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

import java.math.BigDecimal;
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

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateGHCT(@PathVariable("id") Integer id, @Valid @RequestBody GioHangChiTiet updateGHCT, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.ok("Không Được Để Trống");
        } else {
            gioHangChiTietSevice.updateGHCT(id, updateGHCT);
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
                        BigDecimal donGia = gioHangChiTiet.getIdCtsp().getGiaThucTe().multiply(new BigDecimal(updateGHCT.getSoLuong()));
                        gioHangChiTiet.setIdCtsp(updateGHCT.getIdCtsp());
                        gioHangChiTiet.setSoLuong(updateGHCT.getSoLuong());
                        gioHangChiTiet.setDonGia(donGia);
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
        // Delete product on cart
//        gioHangChiTietSevice.deleteGHCT(newHDCT.getIdGhct());
        return ResponseEntity.ok("Tạo Hóa Đơn Thành Công!!!");
    }

    @DeleteMapping("delete-product/{id}")
    public ResponseEntity<?> deteleproductOnCart(@PathVariable("id") Integer idHD) {

        List<HoaDonChiTiet> hoaDonChiTiets = hoadonchitietSevice.findAllByIDHD(idHD);

        for (HoaDonChiTiet x :
                hoaDonChiTiets) {
            GioHangChiTiet gioHangChiTiet = gioHangChiTietSevice.finByIDCTSP(x.getIdCtsp().getIdCtsp()).orElseThrow();
            gioHangChiTietSevice.deleteGHCT(gioHangChiTiet.getIdGhct());
        }
        // Delete product on cart

        return ResponseEntity.ok("Đã Xóa Sản Phẩm Rea Khỏi Giỏ Hàng!!!");
    }

}
