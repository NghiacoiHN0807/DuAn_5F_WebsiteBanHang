package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

import java.util.List;

@RestController
@RequestMapping("/hoa-don-chi-tiet/")
@CrossOrigin("http://localhost:3000/")
public class HoaDonChiTietController {
    @Autowired
    private HoadonchitietSevice hoadonchitietSevice;

    @GetMapping("view-all")
    public List<HoaDonChiTiet> viewAll() {
        return hoadonchitietSevice.chatlieuPage();
    }

    @PostMapping("add")
    public HoaDonChiTiet add(@Valid @RequestBody HoaDonChiTiet newHD,
                             BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return hoadonchitietSevice.add(newHD);
        }
    }

    @GetMapping("view-all-prduct/{idHd}")
    public List<Object[]> getSanPhamsWithSizes(@PathVariable("idHd") Integer idHd) {
        return hoadonchitietSevice.getListProductOncart(idHd);
    }

    @GetMapping("detail-get-one/{id}")
    public List<HoaDonChiTiet> detailCTSP(@PathVariable("id") Integer id) {
        return hoadonchitietSevice.getOne(id);

    }

    @PutMapping("update-hdct/{id}")
    public HoaDonChiTiet updateHDCT(@Valid @RequestBody HoaDonChiTiet updateHD, @PathVariable("id") Integer id,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return hoadonchitietSevice.update(updateHD);
        }
    }

    @PutMapping("update/{id}")
    public HoaDonChiTiet update(@RequestBody HoaDonChiTiet newHDCT,
                                @PathVariable("id") Integer id) {
        HoaDonChiTiet newHD = hoadonchitietSevice.detail(id).map(
                hoaDonChiTiet -> {
                    hoaDonChiTiet.setIdCtsp(newHDCT.getIdCtsp());
                    hoaDonChiTiet.setSoLuong(newHDCT.getSoLuong());
                    hoaDonChiTiet.setDonGia(newHDCT.getDonGia());
                    return hoadonchitietSevice.update(hoaDonChiTiet);
                }).orElseThrow(() -> new xuatXuNotFoundException(id));
        return newHD;
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
