package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.exception.HoaDonChiTietNotFoundException;
import com.example.fullstackbackend.services.HoadonchitietSevice;
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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hoa-don-chi-tiet/")
@CrossOrigin("http://localhost:3000/")
public class HoaDonChiTietController {
    @Autowired
    private HoadonchitietSevice hoadonchitietSevice;

    @GetMapping("view-all")
    public Page<HoaDonChiTiet> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "5") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        Page<HoaDonChiTiet> xuatxus = hoadonchitietSevice.chatlieuPage(p.orElse(page), size);
        return xuatxus;
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
//    @GetMapping("detail/{id}")
//    public Optional<HoaDonChiTiet> detail(@PathVariable("id") Integer id) {
//        Optional<HoaDonChiTiet> findHDCT = hoadonchitietSevice.detail(id);
//        return findHDCT;
//    }

    @GetMapping("detail-get-one/{id}")
    public List<HoaDonChiTiet> detailCTSP(@PathVariable("id") Integer id) {
        List<HoaDonChiTiet> findHDCT = hoadonchitietSevice.getOne(id);
        return findHDCT;
    }

    @PutMapping ("update/{id}")
    public HoaDonChiTiet update(@RequestBody HoaDonChiTiet newHDCT,
            @PathVariable("id") Integer id) {
            HoaDonChiTiet newHD = hoadonchitietSevice.detail(id).map(
                    hoaDonChiTiet -> {
                        hoaDonChiTiet.setIdCtsp(newHDCT.getIdCtsp());
                        hoaDonChiTiet.setSoLuong(newHDCT.getSoLuong());
                        hoaDonChiTiet.setDonGia(newHDCT.getDonGia());
                        return hoadonchitietSevice.add(hoaDonChiTiet);
                    }).orElseThrow(() -> new HoaDonChiTietNotFoundException(id));
        return newHD;
    }
    @PutMapping ("update-cart/{id}")
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
                }).orElseThrow(() -> new HoaDonChiTietNotFoundException(id));
        return newHD;
    }
    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!hoadonchitietSevice.checkExists(id)) {
            throw new HoaDonChiTietNotFoundException(id);
        } else {
            hoadonchitietSevice.delete(id);
            return "";
        }
    }


}
