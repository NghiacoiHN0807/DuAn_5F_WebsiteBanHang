package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.HoadonSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import java.util.Optional;

@RestController
@RequestMapping("/hoa-don/")
@CrossOrigin("http://localhost:3000/")
public class HoaDonController {
    @Autowired
    private HoadonSevice hoadonSevice;


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
            return hoadonSevice.add(newHD);
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

    @PutMapping("update-payment-online/{id}")
    public HoaDon updateThanhToanOnline(@RequestBody HoaDon newHD, @PathVariable("id") Integer id) {
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
//    @PutMapping("update/{id}")
//    public HoaDon update(@Valid @RequestBody HoaDon updateHD,
//                         BindingResult bindingResult,
//                         @PathVariable("id") Integer id) {
//        if (bindingResult.hasErrors()) {
//            return null;
//        } else {
//            return hoadonSevice.add(updateHD);
//        }
//    }
    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        if (!hoadonSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            hoadonSevice.delete(id);
        }
    }


}
