package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.HoaDonChiTiet;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.ChitietsanphamService;
import com.example.fullstackbackend.services.HoadonchitietSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    private HoadonchitietSevice hoadonchitietSevice;

    @Autowired
    private ChitietsanphamService chitietsanphamSer;

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
        if (bindingResult.hasErrors()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "Nhập Thiếu Trường"));
        } else {
            return hoadonchitietSevice.add(newHD);
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

    @GetMapping("detail-get-one/{id}")
    public List<HoaDonChiTiet> detailCTSP(@PathVariable("id") Integer id) {
        return hoadonchitietSevice.getOne(id);

    }

    @PutMapping("update-hdct/{id}")
    public ResponseEntity<?> updateHDCT(@Valid @RequestBody HoaDonChiTiet updateHD, @PathVariable("id") Integer id,
                                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return hoadonchitietSevice.update(updateHD);
        }
    }

    @PutMapping("return-item")
    public HoaDonChiTiet returnItem(@Valid @RequestBody HoaDonChiTiet updateHD,
                                    BindingResult bindingResult) {
        System.out.println("updateHD: " + updateHD.getIdHdct());
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return hoadonchitietSevice.returnItem(updateHD);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(@RequestBody HoaDonChiTiet newHDCT,
                                    @PathVariable("id") Integer id) {
        return hoadonchitietSevice.detail(id).map(
                hoaDonChiTiet -> {
                    ChiTietSanPham ctsp = chitietsanphamSer.findByIdCTSP(newHDCT.getIdCtsp().getIdCtsp()).orElseThrow();
                    BigDecimal newDonGia = ctsp.getGiaThucTe().multiply(new BigDecimal(newHDCT.getSoLuong()));
                    hoaDonChiTiet.setIdCtsp(newHDCT.getIdCtsp());
                    hoaDonChiTiet.setSoLuong(newHDCT.getSoLuong());
                    hoaDonChiTiet.setDonGia(newDonGia);
                    return hoadonchitietSevice.update(hoaDonChiTiet);
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
